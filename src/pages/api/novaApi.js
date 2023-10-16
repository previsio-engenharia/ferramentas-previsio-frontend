/**
 * consulta: gr, nr04, nr05
 * type: cnpj, cnae
 * 
 * 
 * 
 * 1 - verifica método
 * 2 - verifica body
 *      a. consulta e type obrigatorios
 *      b. se consulta = nr04 ou nr05, nro trabalhadores obrigatorio
 * 3 - verifica CNPJ e atribui CNAEs
 *      a - se tem CNPJ, realiza fecth na api minha receita
 *      b - se não tem CNPJ, pula etapa e atruibui o(s) CNAE(s) fornecidos para busca
 *      c - se não tem nem CNPJ nem CNAE, retorna erro
 *  4 - realiza consulta na tabela relacao_cnae_gr
 *  >> obtem todos grau de risco
 *  >> encontra maior grau de risco
 * 
 *  SE consulta = GR:
 *  5 - retorna dados da empresa e dados dos CNAEs relacionados OU apenas dos CNAEs relacionados
 *  
 *  SE consulta = nr04:
 *  5 - consulta tabela dimensionamento_sesmt para encontrar equipe sesmt com maior grau de risco e nro de trabalhadores
 * 
 * SE consulta = nr05:
 *  5 - consulta tabela dimensionamento_cipa para encontrar equipe sesmt com maior grau de risco e nro de trabalhadores
 *  
 * 
 * 
 * */

import { relacao_cnae_gr } from "static/nr04_tables";


export default async function handler(req, res) {
    // só aceita método POST. Se receber outro retorna erro
    if (req.method != 'POST') {
        res.status(405).json({
            success: false,
            message: 'Método da requisição não permitido',
        })
    }

    //extrai campos que são recebidos no body
    const consulta = req.body.consulta;
    const cnpjInserido = req.body.cnpj;
    const codigoCnae1Inserido = req.body.codigo_cnae1;
    const codigoCnae2Inserido = req.body.codigo_cnae2;
    const numeroTrabalhadoresInserido = req.body.numero_trabalhadores;
    const userEmail = req.body.userEmail;

    //cria status inicial da consulta
    let statusConsulta = 10;

    //verifica tipo da consulta solicitada. Retorna erro se não recebeu todos dados
    switch (consulta) {
        case 'gr':
            if (!cnpjInserido && !codigoCnae1Inserido && !codigoCnae2Inserido) {
                res.status(400).json({
                    success: false,
                    message: 'Informações faltantes na requisição',
                });
            }
            break;
        case 'nr04': case 'nr05':
            if ((!cnpjInserido && !codigoCnae1Inserido && !codigoCnae1Inserido) || !numeroTrabalhadoresInserido) {
                res.status(400).json({
                    success: false,
                    message: 'Informações faltantes na requisição',
                });
            }
            break;
        default:
            res.status(400).json({
                success: false,
                message: 'Informações faltantes na requisição ',
            })
            break;
    }

    let resposta = {
        dadosCnaes: [],
    }

    //se recebeu cnpj, consulta na API minhareceita
    if (cnpjInserido) {
        const dados = await consultaCnpj(cnpjInserido);
        if (dados.success) {
            resposta.dadosDaEmpresa = dados.dadosDaEmpresa;
            resposta.dadosCnaes = dados.dadosCnaes;
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Não foi possível acessar a consulta do CNPJ. Considere realizar a consulta com o código CNAE, ou tente novamente mais tarde.',
            })
        }
        //res.status(200).json(dados)
    }
    else {
        if (codigoCnae1Inserido) {
            resposta.dadosCnaes.push({
                codigo: codigoCnae1Inserido,
            })
        }
        if (codigoCnae2Inserido) {
            resposta.dadosCnaes.push({
                codigo: codigoCnae2Inserido,
            })
        }
    }

    //consulta as infos dos cnaes na tabela de relação cnae x gr
    resposta.dadosCnaes.forEach((element, index) => {
        const consultaGrauRisco = consultaGrCnaes(element.codigo)
        resposta.dadosCnaes[index] = {
            ...element,
            denominacao: consultaGrauRisco.denominacao,
            grauDeRisco: consultaGrauRisco.grau_risco
        }
    });


    ///AQUI PRECISAR ENCONTRAR O MAIOR GR

    // DEPOS VERIFICAR O TIPO DE CONSULTA (GR, NR04, NR05) E FAZER AS CONSUTLAS NECESSÁRIAS

    res.status(200).json(resposta)
    
}




async function consultaCnpj(cnpjInserido) {
    try {
        //GET request na API
        console.log("Consulta o CNPJ");
        const response = await fetch('https://minhareceita.org/' + cnpjInserido);
        const dadosCnpj = await response.json();
        //console.log("RESP", dadosCnpj);

        //inicializa com cnae fiscal na posição 0
        let cnaes = [{
            codigo: converteCnaeParaString(dadosCnpj.cnae_fiscal),
            //descricao: dadosCnpj.cnae_fiscal_descricao,
        }]

        dadosCnpj.cnaes_secundarios.forEach((element, index) => {
            //cnaes[index + 1] = {
            cnaes.push({
                codigo: converteCnaeParaString(element.codigo),
                //descricao: element.descricao,
            })
        });

        return {
            success: true,
            message: "Consulta api ok",
            dadosDaEmpresa: {
                cnpj: cnpjInserido,
                porte: dadosCnpj.porte,
                codigo_porte: dadosCnpj.codigo_porte,
                razao_social: dadosCnpj.razao_social,
                nome_fantasia: dadosCnpj.nome_fantasia,
                opcao_pelo_mei: dadosCnpj.opcao_pelo_mei,
                //opcao_pelo_simples: dadosCnpj.opcao_pelo_simples,               
            },
            dadosCnaes: cnaes,
        }
    }
    catch (error) {
        console.log(`Não conseguiu consultar CNPJ: ${error}`);
        //status_consulta = 52; // CNPJ consultado na API mas não encontrado
        //respostaConsultaTabelas.status = 400;
        //respostaConsultaTabelas.erro = true;
        //respostaConsultaTabelas.mensagem = 'Erro: não foi possível consultar o CNPJ informado';

        return {
            success: false,
            message: "Erro ao consultar api"
        }
    }
}

function converteCnaeParaString(codigoCnae) {
    const cnaeParaConverter = codigoCnae.toString()
    return cnaeParaConverter.charAt(0) + cnaeParaConverter.charAt(1) + '.' + cnaeParaConverter.charAt(2) + cnaeParaConverter.charAt(3) + '-' + cnaeParaConverter.charAt(4);
}

function consultaGrCnaes(codigoCnae) {
    const tableItem = relacao_cnae_gr.find(item => item.codigo_cnae == codigoCnae)
    return tableItem
}

async function consultaNr04Cnaes() {

}

async function consultaNr05Cnaes() {

}