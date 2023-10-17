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

import { dimensionamento_sesmt, relacao_cnae_gr } from "static/nr04_tables";


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

    let maiorGrauRisco = 0

    //consulta as infos dos cnaes na tabela de relação cnae x gr
    resposta.dadosCnaes.forEach((element, index) => {
        const consultaGrauRisco = consultaGrCnaes(element.codigo)
        resposta.dadosCnaes[index] = {
            ...element,
            denominacao: consultaGrauRisco.denominacao,
            grauDeRisco: consultaGrauRisco.grau_risco
        }
        if (consultaGrauRisco.grau_risco > maiorGrauRisco) {
            maiorGrauRisco = consultaGrauRisco.grau_risco;
        }
    });
    if (resposta.dadosDaEmpresa) {
        resposta.dadosDaEmpresa.maiorGrauDeRisco = maiorGrauRisco
    }


    //verifica tipo da consulta solicitada. Retorna erro se não recebeu todos dados
    switch (consulta) {
        case 'gr':
            res.status(200).json({
                success: true,
                message: 'Consulta do grau de Risco realizada com sucesso',
                resposta,
            });
            break;
        case 'nr04':
            const consultaSesmt = consultaNr04Cnaes(maiorGrauRisco, numeroTrabalhadoresInserido)
            if(consultaSesmt.erro){
                res.status(400).json({
                    success: false,
                    message: consultaSesmt.mensagem,
                });
            }
            else{
                resposta.consultaSesmt = consultaSesmt;
                res.status(200).json({
                    success: true,
                    message: 'Consulta da equipe SESMT realizada com sucesso',
                    resposta
                });
            }
            
            break;
        case 'nr05':
            res.status(200).json({
                success: false,
                message: 'Informações faltantes na requisição',
            });
            break;
        default:
            res.status(400).json({
                success: false,
                message: 'Informações faltantes na requisição ',
            })
            break;
    }





    // DEPOS VERIFICAR O TIPO DE CONSULTA (GR, NR04, NR05) E FAZER AS CONSUTLAS NECESSÁRIAS

    //res.status(200).json(resposta)

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

function consultaNr04Cnaes(maiorGrauRisco, nroTrabalhadores) {

    var consultaSesmt = {
        nroTrabalhadoresMinSesmt: 0,
        nroTrabalhadoresMaxSesmt: 0,
        tecnicoSeg: 0,
        engenheiroSeg: 0,
        auxTecEnfermagem: 0,
        enfermeiro: 0,
        medico: 0,
        obsSesmt1: false,
        obsSesmt2: false,
        obsSesmt3: false,
    }

    var respostaErro = {
        status_consulta: 0, //55, // Não foi possível realizar correspondência na tabela SESMT
        erro: false,
        mensagem: '',
    }

    if (nroTrabalhadores > 5000) {
        //calcula fator de multiplicação para grupos acima de 5000
        const gruposAcima5000 = Math.floor((nroTrabalhadores - 5000) / 4000) + Math.floor(((nroTrabalhadores - 5000) % 4000) / 2000);

        const sesmt_table = dimensionamento_sesmt.filter(item => (
            item.grau_risco == maiorGrauRisco
            && item.nro_trabalhadores_max >= 5000));

        /*
                if (sesmt_table) {
                    //sesmt_table.push(tableItem)
                    //console.log("Sesmt encontrado:", sesmt_table)
                    //console.log("[0]", sesmt_table[0])
                    //console.log("[1]", sesmt_table[1])
                }
                else {
                    //console.log("Sesmt não encontrado:")
                }
        
                //console.log("SESMT TABLE:", sesmt_table)
        */


        if (sesmt_table.length > 0) {

            //se deu tudo certo, atribui os valores consultados a variável de resposta
            //verifica se há valores com observações (*) e cria a string de forma adequada

            consultaSesmt.nroTrabalhadoresMinSesmt = 5001;
            consultaSesmt.nroTrabalhadoresMaxSesmt = '';

            if (sesmt_table[1].tecnico_seg.indexOf('*') >= 0) {
                consultaSesmt.obsSesmt1 = true;
                consultaSesmt.tecnicoSeg = sesmt_table[0].tecnico_seg + ' + ' + (parseInt(sesmt_table[1].tecnico_seg) * gruposAcima5000) + '*';
            } else {
                consultaSesmt.tecnicoSeg = parseInt(sesmt_table[0].tecnico_seg) + parseInt(sesmt_table[1].tecnico_seg) * gruposAcima5000;
            }
            //
            if (sesmt_table[1].engenheiro_seg.indexOf('*') >= 0) {
                consultaSesmt.obsSesmt1 = true;
                consultaSesmt.engenheiroSeg = sesmt_table[0].engenheiro_seg + ' + ' + (parseInt(sesmt_table[1].engenheiro_seg) * gruposAcima5000) + '*';
            } else {
                consultaSesmt.engenheiroSeg = parseInt(sesmt_table[0].engenheiro_seg) + parseInt(sesmt_table[1].engenheiro_seg) * gruposAcima5000;
            }
            //
            if (sesmt_table[1].aux_tec_enfermagem.indexOf('*') >= 0) {
                consultaSesmt.obsSesmt1 = true;
                consultaSesmt.auxTecEnfermagem = sesmt_table[0].aux_tec_enfermagem + ' + ' + (parseInt(sesmt_table[1].aux_tec_enfermagem) * gruposAcima5000) + '*';
            } else {
                consultaSesmt.auxTecEnfermagem = parseInt(sesmt_table[0].aux_tec_enfermagem) + parseInt(sesmt_table[1].aux_tec_enfermagem) * gruposAcima5000;
            }
            //
            if (sesmt_table[1].enfermeiro.indexOf('*') >= 0) {
                consultaSesmt.obsSesmt1 = true;
                consultaSesmt.enfermeiro = sesmt_table[0].enfermeiro + ' + ' + (parseInt(sesmt_table[1].enfermeiro) * gruposAcima5000) + '*';
            } else {
                consultaSesmt.enfermeiro = parseInt(sesmt_table[0].enfermeiro) + parseInt(sesmt_table[1].enfermeiro) * gruposAcima5000;
            }
            //
            if (sesmt_table[1].medico.indexOf('*') >= 0) {
                consultaSesmt.obsSesmt1 = true;
                consultaSesmt.medico = sesmt_table[0].medico + ' + ' + (parseInt(sesmt_table[1].medico) * gruposAcima5000) + '*';
            } else {
                consultaSesmt.medico = parseInt(sesmt_table[0].medico) + parseInt(sesmt_table[1].medico) * gruposAcima5000;
            }
            consultaSesmt.obsSesmt2 = true;
        }
        else {
            //se ocorreu algum erro, preenche informações para retornar ao front
            respostaErro.status_consulta = 55; // Não foi possível realizar correspondência na tabela SESMT
            respostaErro.erro = true;
            respostaErro.mensagem = 'Erro: Nenhum valor encontrado da base de dados da equipe SESMT.'
        }
    }
    else {
        const sesmt_table = dimensionamento_sesmt.find(
            item => (
                item.grau_risco == maiorGrauRisco
                && item.nro_trabalhadores_max >= nroTrabalhadores
                && item.nro_trabalhadores_min <= nroTrabalhadores))

        /*
                if (sesmt_table) {
                    //sesmt_table.push(tableItem)
                    //console.log("Sesmt encontrado:", sesmt_table)
                }
                else {
                    //console.log("Sesmt não encontrado:")
                }
        */

        //console.log("SESMT TABLE:", sesmt_table)

        if (sesmt_table) {
            //se deu tudo certo, atribui os valores consultados a variável de resposta
            consultaSesmt.nroTrabalhadoresMinSesmt = sesmt_table.nro_trabalhadores_min;
            consultaSesmt.nroTrabalhadoresMaxSesmt = sesmt_table.nro_trabalhadores_max;
            consultaSesmt.tecnicoSeg = sesmt_table.tecnico_seg;
            consultaSesmt.engenheiroSeg = sesmt_table.engenheiro_seg;
            consultaSesmt.auxTecEnfermagem = sesmt_table.aux_tec_enfermagem;
            consultaSesmt.enfermeiro = sesmt_table.enfermeiro;
            consultaSesmt.medico = sesmt_table.medico;

            const str = JSON.stringify(consultaSesmt);

            //verifica se há algum valor com observação (*)
            if (str.indexOf('"1***"') >= 0)
                consultaSesmt.obsSesmt3 = true;
            if (str.indexOf('"1*"') >= 0)
                consultaSesmt.obsSesmt1 = true;

        } else {
            //se ocorreu algum erro, preenche informações para retornar ao front
            respostaErro.status_consulta = 55; // Não foi possível realizar correspondência na tabela SESMT
            respostaErro.erro = true;
            respostaErro.mensagem = 'Erro: Nenhum valor encontrado da base de dados da equipe SESMT.'
        }
    }
    if(respostaErro.erro){
        return respostaErro;
    }
    else {
        return consultaSesmt;
    }
}

async function consultaNr05Cnaes() {

}