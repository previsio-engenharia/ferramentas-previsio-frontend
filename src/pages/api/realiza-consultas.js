/**
 * Códigos de status do resultado da consulta:
    Status	Descrição
    10	    // ok 
    50	    // erro interno na consulta
    51	    // não foi possivel acessar a  API para consulta CNPJ
    52	    // CNPJ consultado na API mas não encontrado
    53	    // Código CNAE não identificado
    54	    // CNAE informado não encontrado no DB
    55	    // Não foi possível realizar correspondência na tabela SESMT
    56	    // Não foi possível realizar correspondência na tabela CIPA
 */

import { dimensionamento_sesmt, relacao_cnae_gr, observacoes_tabela_sesmt } from "static/nr04_tables";
import { dimensionamento_cipa } from "static/nr05_tables";

export default async function handler(req, res) {
    // só aceita método POST. Se receber outro retorna erro
    if (req.method != 'POST') {
        return res.status(405).json({
            success: false,
            //statusConsulta:
            mensagem: 'Método da requisição não permitido',
        })
    }

    //extrai campos que são recebidos no body
    const consulta = req.body.consulta;
    const cnpjInserido = req.body.cnpj;
    const codigoCnae1Inserido = req.body.codigo_cnae1;
    const codigoCnae2Inserido = req.body.codigo_cnae2;
    const numeroTrabalhadoresInserido = req.body.numero_trabalhadores;
    //const userEmail = req.body.userEmail;

    //verifica tipo da consulta solicitada. Retorna erro se não recebeu todos dados
    switch (consulta) {
        case 'gr':
            if (!cnpjInserido && !codigoCnae1Inserido && !codigoCnae2Inserido) {
                return res.status(400).json({
                    success: false,
                    //status_consulta:
                    mensagem: 'Informações faltantes na requisição',
                });
            }
            break;
        case 'nr04': case 'nr05':
            if ((!cnpjInserido && !codigoCnae1Inserido && !codigoCnae2Inserido) || !numeroTrabalhadoresInserido || parseInt(numeroTrabalhadoresInserido) < 0) {
                return res.status(400).json({
                    success: false,
                    //status_consulta:
                    mensagem: 'Informações faltantes na requisição',
                });
            }
            break;
        default:
            return res.status(400).json({
                success: false,
                //status_consulta:
                mensagem: 'Informações faltantes na requisição ',
            })
            break;
    }

    let arrayDadosCnae = [];
    let resposta = {
        dadosCnaes: [],
    }

    //se recebeu cnpj, consulta na API minhareceita
    if (cnpjInserido) {
        const dados = await consultaCnpj(cnpjInserido);
        if (dados.success) {
            resposta.dadosDaEmpresa = { 
                ... dados.dadosDaEmpresa,
                numero_trabalhadores: numeroTrabalhadoresInserido,
            };
            arrayDadosCnae = dados.dadosCnaes;
        }
        else {
            return res.status(400).json({
                success: false,
                status_consulta: dados.status_consulta,
                tipo_consulta: consulta,
                mensagem: dados.mensagem,
            })
        }
    }
    else {
        if (codigoCnae1Inserido) {
            arrayDadosCnae.push({
                codigo: codigoCnae1Inserido,
            })
        }
        if (codigoCnae2Inserido) {
            arrayDadosCnae.push({
                codigo: codigoCnae2Inserido,
            })
        }
    }

    let maiorGrauRisco = 0

    //consulta as infos dos cnaes na tabela de relação cnae x gr
    arrayDadosCnae.forEach((element, index) => {
        const consultaGrauRisco = consultaGrCnaes(element.codigo)

        if (consultaGrauRisco) {
            resposta.dadosCnaes.push({
                codigo: element.codigo,
                denominacao: consultaGrauRisco.denominacao,
                grauDeRisco: consultaGrauRisco.grau_risco
            })
            if (consultaGrauRisco.grau_risco > maiorGrauRisco) {
                maiorGrauRisco = consultaGrauRisco.grau_risco;
            }
        }
    });

    if (maiorGrauRisco == 0) {
        return res.status(400).json({
            success: false,
            status_consulta: 53,
            tipo_consulta: consulta,
            mensagem: 'Códigos CNAE não encontrados na consulta',
        })
    }
    else {
        if (resposta.dadosDaEmpresa) {
            resposta.dadosDaEmpresa.maiorGrauDeRisco = maiorGrauRisco
            
            /* console.log("Verifica Dispensa PGR:")
            console.log("MEI:", resposta.dadosDaEmpresa.opcao_pelo_mei)
            console.log("Porte:", resposta.dadosDaEmpresa.codigo_porte)
            console.log("GR:", resposta.dadosDaEmpresa.maiorGrauDeRisco) */
            if (resposta.dadosDaEmpresa.opcao_pelo_mei) {
                resposta.dadosDaEmpresa.dispensaPGR = true;
            }
            else if (resposta.dadosDaEmpresa.codigo_porte == 1 || resposta.dadosDaEmpresa.codigo_porte == 3) {
                if (maiorGrauRisco < 3) {
                    resposta.dadosDaEmpresa.dispensaPGR = true;
                }
            }
            else {
                resposta.dadosDaEmpresa.dispensaPGR = false;
            }
        }
    }

    //verifica tipo da consulta solicitada. Retorna erro se não recebeu todos dados
    switch (consulta) {
        case 'gr':
            return res.status(200).json({
                success: true,
                status_consulta: 10,
                tipo_consulta: consulta,
                mensagem: 'Consulta do grau de Risco realizada com sucesso',
                ...resposta,
            });
            break;
        case 'nr04':
            const consultaSesmt = consultaNr04Cnaes(maiorGrauRisco, numeroTrabalhadoresInserido)
            if (consultaSesmt.erro) {
                return res.status(400).json({
                    success: false,
                    status_consulta: 55,
                    tipo_consulta: consulta,
                    mensagem: consultaSesmt.mensagem,
                });
            }
            else {
                resposta.consultaSesmt = consultaSesmt;
                return res.status(200).json({
                    success: true,
                    status_consulta: 10,
                    tipo_consulta: consulta,
                    mensagem: 'Consulta da equipe SESMT realizada com sucesso',
                    ...resposta
                });
            }

            break;
        case 'nr05':
            const consultaCipa = consultaNr05Cnaes(maiorGrauRisco, numeroTrabalhadoresInserido)
            if (consultaCipa.erro) {
                return res.status(400).json({
                    success: false,
                    status_consulta: 56,
                    tipo_consulta: consulta,
                    mensagem: consultaCipa.mensagem,
                });
            }
            else {
                resposta.consultaCipa = consultaCipa;
                return res.status(200).json({
                    success: true,
                    status_consulta: 10,
                    tipo_consulta: consulta,
                    mensagem: 'Consulta da equipe CIPA realizada com sucesso',
                    ...resposta
                });
            }
            break;
        default:
            return res.status(400).json({
                success: false,
                status_consulta: 50,
                tipo_consulta: consulta,
                mensagem: 'Informações faltantes na requisição ',
            })
            break;
    }
}


//funções

async function consultaCnpj(cnpjInserido) {
    try {
        //GET request na API
        //console.log("Consulta o CNPJ");
        const response = await fetch('https://minhareceita.org/' + cnpjInserido);
        const dadosCnpj = await response.json();
        //console.log("RESP", dadosCnpj);

        if (response.status == 400) {
            //cnpj consultado não encontrado
            return {
                success: false,
                status_consulta: 52,
                mensagem: dadosCnpj.message,
            }
        }

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
            mensagem: "Consulta api ok",
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
        return {
            success: false,
            status_consulta: 51,
            mensagem: 'Não foi possível acessar a consulta do CNPJ. Considere realizar a consulta com o código CNAE, ou tente novamente mais tarde.'
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
    if (respostaErro.erro) {
        return respostaErro;
    }
    else {
        if(consultaSesmt.obsSesmt1){
            consultaSesmt.obsSesmt1 = observacoes_tabela_sesmt[0]
        }
        if(consultaSesmt.obsSesmt2){
            consultaSesmt.obsSesmt2 = observacoes_tabela_sesmt[1]
        }
        if(consultaSesmt.obsSesmt3){
            consultaSesmt.obsSesmt3 = observacoes_tabela_sesmt[2]
        }
        return consultaSesmt;
    }
}

function consultaNr05Cnaes(maiorGrauRisco, nroTrabalhadores) {

    var consultaCipa = {
        nroTrabalhadoresMinCipa: 0,
        nroTrabalhadoresMaxCipa: 0,
        cipaEfetivos: 0,
        cipaSuplentes: 0
    }

    var respostaErro = {
        status_consulta: 0, //55, // Não foi possível realizar correspondência na tabela CIPA
        erro: false,
        mensagem: '',
    }

    if (nroTrabalhadores > 10000) {
        //calcula fator de multiplicação para grupos acima de 5000
        var gruposAcima10000 = Math.floor((nroTrabalhadores - 10000) / 2500);
        //console.log('CIPA: ' + gruposAcima10000.toString());

        const cipa_table = dimensionamento_cipa.filter(
            item => (
                item.grau_risco == maiorGrauRisco
                && item.nro_trabalhadores_max >= 10000
            )
        )

        if (cipa_table) {
            //se deu tudo certo, atribui os valores consultados a variável de resposta
            consultaCipa.nroTrabalhadoresMinCipa = cipa_table[0].nro_trabalhadores_min;
            consultaCipa.nroTrabalhadoresMaxCipa = cipa_table[0].nro_trabalhadores_max;
            consultaCipa.cipaEfetivos = parseInt(cipa_table[0].integrantes_efetivos) + parseInt(cipa_table[1].integrantes_efetivos) * gruposAcima10000;
            consultaCipa.cipaSuplentes = parseInt(cipa_table[0].integrantes_suplentes) + parseInt(cipa_table[1].integrantes_suplentes) * gruposAcima10000;

            //Última consulta, escreve mensagem de aprovação
            //respostaConsultaTabelas.mensagem = 'Todos dados consultados com sucesso'
        }
        else {
            //se ocorreu algum erro, preenche informações para retornar ao front
            respostaErro.status_consulta = 56; // Não foi possível realizar correspondência na tabela CIPA
            respostaErro.erro = true;
            respostaConsultaTabelas.mensagem = 'Erro: Nenhum valor encontrado da base de dados da equipe CIPA.'
        }
    }
    else {
        const cipa_table = dimensionamento_cipa.filter(
            item => (
                item.grau_risco == maiorGrauRisco
                && item.nro_trabalhadores_max >= nroTrabalhadores
                && item.nro_trabalhadores_min <= nroTrabalhadores
            )
        )

        if (cipa_table) {
            //console.log("CIPA TABLE < 10000:", cipa_table)
            //se deu tudo certo, atribui os valores consultados a variável de resposta
            consultaCipa.nroTrabalhadoresMinCipa = cipa_table[0].nro_trabalhadores_min;
            consultaCipa.nroTrabalhadoresMaxCipa = cipa_table[0].nro_trabalhadores_max;
            consultaCipa.cipaEfetivos = cipa_table[0].integrantes_efetivos;
            consultaCipa.cipaSuplentes = cipa_table[0].integrantes_suplentes;

            //Última consulta, escreve mensagem de aprovação
            //respostaConsultaTabelas.mensagem = 'Todos dados consultados com sucesso'
        } else {
            //se ocorreu algum erro, preenche informações para retornar ao front
            respostaErro.status_consulta = 56; // Não foi possível realizar correspondência na tabela CIPA
            //respostaConsultaTabelas.status = 400;
            respostaErro.erro = true;
            respostaErro.mensagem = 'Erro: Nenhum valor encontrado da base de dados da equipe CIPA.'
        }
    }
    if (respostaErro.erro) {
        return respostaErro;
    }
    else {
        return consultaCipa;
    }
}