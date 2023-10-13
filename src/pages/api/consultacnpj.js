import { dimensionamento_sesmt, relacao_cnae_gr } from "static/nr04_tables";
import { dimensionamento_cipa } from "static/nr05_tables";

export default async function handler(req, res) {
    console.log("Entrou na api nova")
    //Verifica o método da requisição (permite apenas método POST)
    if (req.method === 'POST') {
        // Verifica se os parâmetros foram inseridos na request

        const consulta = req.body.consulta;
        const cnpjInserido = req.body.cnpj;
        const codigoCnae1Inserido = req.body.codigo_cnae1;
        const codigoCnae2Inserido = req.body.codigo_cnae2;
        const numero_trabalhadores_inserido = req.body.numero_trabalhadores;
        const userEmail = req.body.userEmail;
        let status_consulta = 10;


        if (consulta && (cnpjInserido || codigoCnae1Inserido || codigoCnae2Inserido)) {

            var consultaCNPJ = {
                codigosCnae: [],
                descricaoCnae: [],
                dataUpdate: ''
            }

            var codigosCnaesConsultar = [];

            //estrutura para resposta
            var respostaConsultaTabelas = {
                status: 200,
                erro: false,
                mensagem: '',
                tipo_consulta: consulta,
                nroTrabalhadores: numero_trabalhadores_inserido,
                codigoCnae: [],
                descricaoCnae: [],
                graudeRisco: []
            };

            try {
                //console.log(req.body.elementToAdd);
                if (cnpjInserido) {
                    //consulta informações no CNPJ inserido na API minhareceita.org 
                    /*      
                    try {
                        console.log("Verifica se minhareceita está online")
                        const serviceOnline = await fetch('https://minhareceita.org/updated', { json: true });
                        if (serviceOnline.status != 200) {
                            console.log("Erro")
                            status_consulta = 51; //não foi possivel acessar a  API para consulta CNPJ
                            respostaConsultaTabelas.status = 400;
                            respostaConsultaTabelas.erro = true;
                            respostaConsultaTabelas.mensagem = 'Erro: não foi possível acessar a consulta do CNPJ. Considere realizar a consulta com o código CNAE, ou tente novamente mais tarde.';
                        }
                        else {
                            console.log("Ok")
                            consultaCNPJ.dataUpdate = serviceOnline.body.message;
                        }
                    } catch (error) {
                        console.log("Não foi possivel acessar a  API")
                        status_consulta = 51; //não foi possivel acessar a  API para consulta CNPJ
                        respostaConsultaTabelas.status = 400;
                        respostaConsultaTabelas.erro = true;
                        respostaConsultaTabelas.mensagem = 'Erro: não foi possível acessar a consulta do CNPJ. Considere realizar a consulta com o código CNAE ou tente novamente mais tarde.';
                    }
                    */

                    //console.log("Tá aqui 1", respostaConsultaTabelas.erro)

                    //if (!respostaConsultaTabelas.erro) {
                    try {
                        //GET request na API
                        console.log("Consulta o CNPJ")
                        const response = await fetch('https://minhareceita.org/' + cnpjInserido);
                        const r = await response.json()
                        console.log("RESP", r)
                        const c = r.cnae_fiscal.toString();
                        console.log("cnae fiscal:", c)
                        //const c = JSON.stringify(response.body.cnae_fiscal);
                        //formata o CNAE principal para o formato ab.cd-e, conforme inserido na tabela do grau de risco na NR04
                        consultaCNPJ.codigosCnae[0] = c.charAt(0) + c.charAt(1) + '.' + c.charAt(2) + c.charAt(3) + '-' + c.charAt(4);
                        console.log(consultaCNPJ.codigosCnae)
                        consultaCNPJ.descricaoCnae[0] = r.cnae_fiscal_descricao;
                        respostaConsultaTabelas.codigoCnaeFiscal = consultaCNPJ.codigosCnae[0];
                        respostaConsultaTabelas.descricaoCnaeFiscal = consultaCNPJ.descricaoCnae[0];

                        console.log("1")
                        for (var i = 0; i < r.cnaes_secundarios.length; i++) {
                            //formata todos os cnaes secundários
                            var cAux = r.cnaes_secundarios[i].codigo.toString();
                            consultaCNPJ.codigosCnae[i + 1] = cAux.charAt(0) + cAux.charAt(1) + '.' + cAux.charAt(2) + cAux.charAt(3) + '-' + cAux.charAt(4);
                            consultaCNPJ.descricaoCnae[i + 1] = r.cnaes_secundarios[i].descricao;
                        }
                        console.log("2")
                        respostaConsultaTabelas.cnpj = cnpjInserido;
                        respostaConsultaTabelas.razaoSocial = r.razao_social;
                        respostaConsultaTabelas.nomeFantasia = r.nome_fantasia;
                        //incluir porte da empresa e opção pelo MEI
                        respostaConsultaTabelas.porte = r.porte;
                        respostaConsultaTabelas.codigoPorte = r.codigo_porte;
                        respostaConsultaTabelas.mei = r.opcao_pelo_mei;

                        //console.log(respostaConsultaTabelas.codigosCnae[0]);
                        //respostaConsultaTabelas.codigosCnae[0] = response.body.cnae_fiscal;
                    } catch (error) {
                        console.log(`Não conseguiu consultar CNPJ: ${error}`);
                        status_consulta = 52; // CNPJ consultado na API mas não encontrado
                        respostaConsultaTabelas.status = 400;
                        respostaConsultaTabelas.erro = true;
                        respostaConsultaTabelas.mensagem = 'Erro: não foi possível consultar o CNPJ informado';
                    }
                    //}
                }
                console.log("3")

                if (!respostaConsultaTabelas.erro) {
                    if (consultaCNPJ.codigosCnae.length > 0) {
                        console.log("Atribui CNAE da consulta cnpj")
                        for (var i = 0; i < consultaCNPJ.codigosCnae.length; i++) {
                            codigosCnaesConsultar[i] = consultaCNPJ.codigosCnae[i];
                            //console.log(codigosCnaesConsultar[i]);
                        }
                    } else if (codigoCnae1Inserido) {
                        console.log("Atribui CNAE 1 do formulário")
                        codigosCnaesConsultar[0] = codigoCnae1Inserido;
                        if (codigoCnae2Inserido) {
                            codigosCnaesConsultar[1] = codigoCnae2Inserido;
                        }
                        //console.log(codigosCnaesConsultar[0]);
                    } else {
                        if (codigoCnae2Inserido) {
                            console.log("Atribui CNAE 2 do formulário")
                            codigosCnaesConsultar[0] = codigoCnae2Inserido;
                        } else {
                            status_consulta = 53; // Código CNAE não identificado
                            respostaConsultaTabelas.status = 400;
                            respostaConsultaTabelas.erro = true;
                            respostaConsultaTabelas.mensagem = 'Erro: não foi possível identificar o código CNAE relacionado';
                        }
                    }
                }


                if (!respostaConsultaTabelas.erro) {
                    console.log("Procura o CNAE na tabela NR04")
                    //consulta tabela CNAEs

                    let cnae_table = []

                    codigosCnaesConsultar.forEach(element => {
                        const tableItem = relacao_cnae_gr.find(item => item.codigo_cnae == element)
                        if (tableItem) {
                            cnae_table.push(tableItem)
                            //console.log("CNAE encontrado:", tableItem)
                        }
                        else {
                            //console.log("CNAE não encontrado")
                        }
                    });

                    //console.log("TABLE:", cnae_table)

                    if (cnae_table.length > 0) {
                        console.log("Consulta ok, extrai respostas")
                        for (var i = 0; i < cnae_table.length; i++) {
                            respostaConsultaTabelas.codigoCnae[i] = cnae_table[i].codigo_cnae;
                            respostaConsultaTabelas.descricaoCnae[i] = cnae_table[i].denominacao;
                            respostaConsultaTabelas.graudeRisco[i] = parseInt(cnae_table[i].grau_risco);
                            //console.log('CNAE '+i+': '+cnae_table[i].codigo_cnae);
                        }
                        if (cnae_table.length > 1) {
                            //verifica qual é o maior grau de risco
                            respostaConsultaTabelas.maiorGrauRisco = Math.max(...respostaConsultaTabelas.graudeRisco);
                        }
                        else {
                            respostaConsultaTabelas.maiorGrauRisco = parseInt(cnae_table[0].grau_risco);
                        }
                        //Se inserido o CNPJ, verifica a opção por dispensar o PGR

                        console.log("Verifica Dispensa PGR")
                        if (respostaConsultaTabelas.mei) {
                            respostaConsultaTabelas.dispensaPGR = true;
                        }
                        else if (respostaConsultaTabelas.codigoPorte == 1 || respostaConsultaTabelas.codigoPorte == 3) {
                            if (respostaConsultaTabelas.maiorGrauRisco < 3) {
                                respostaConsultaTabelas.dispensaPGR = true;
                            }
                        }
                        else {
                            respostaConsultaTabelas.dispensaPGR = false;
                        }
                    }
                    else {
                        console.log("Erro na consulta da tabela nr04")
                        //se ocorreu algum erro, preenche informações para retornar ao front
                        status_consulta = 54; // CNAE informado não encontrado no DB
                        respostaConsultaTabelas.status = 400;
                        respostaConsultaTabelas.erro = true;
                        respostaConsultaTabelas.mensagem = 'Erro: Nenhum valor encontrado com o CNAE informado.'
                    }

                }

                /*
                *  Se for uma consulta de GR, interrompe as consultas aqui
                */

                //consultar somente se nro trabalhadores >= 50
                if (!respostaConsultaTabelas.erro && consulta != 'gr') {
                    //se o nro trabalhadores > 5000, realizar duas consultas, para 5000 e mais. Fazer o calculo
                    if (respostaConsultaTabelas.nroTrabalhadores > 5000) {

                        //calcula fator de multiplicação para grupos acima de 5000
                        var gruposAcima5000 = Math.floor((respostaConsultaTabelas.nroTrabalhadores - 5000) / 4000) + Math.floor(((respostaConsultaTabelas.nroTrabalhadores - 5000) % 4000) / 2000);

                        const sesmt_table = dimensionamento_sesmt.filter(item => (item.grau_risco == respostaConsultaTabelas.maiorGrauRisco && item.nro_trabalhadores_max >= 5000))

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




                        if (sesmt_table.length > 0) {

                            //se deu tudo certo, atribui os valores consultados a variável de resposta
                            //verifica se há valores com observações (*) e cria a string de forma adequada

                            respostaConsultaTabelas.nroTrabalhadoresMinSesmt = 5001;
                            respostaConsultaTabelas.nroTrabalhadoresMaxSesmt = '';

                            if (sesmt_table[1].tecnico_seg.indexOf('*') >= 0) {
                                respostaConsultaTabelas.obsSesmt1 = true;
                                respostaConsultaTabelas.tecnicoSeg = sesmt_table[0].tecnico_seg + ' + ' + (parseInt(sesmt_table[1].tecnico_seg) * gruposAcima5000) + '*';
                            } else {
                                respostaConsultaTabelas.tecnicoSeg = parseInt(sesmt_table[0].tecnico_seg) + parseInt(sesmt_table[1].tecnico_seg) * gruposAcima5000;
                            }
                            //
                            if (sesmt_table[1].engenheiro_seg.indexOf('*') >= 0) {
                                respostaConsultaTabelas.obsSesmt1 = true;
                                respostaConsultaTabelas.engenheiroSeg = sesmt_table[0].engenheiro_seg + ' + ' + (parseInt(sesmt_table[1].engenheiro_seg) * gruposAcima5000) + '*';
                            } else {
                                respostaConsultaTabelas.engenheiroSeg = parseInt(sesmt_table[0].engenheiro_seg) + parseInt(sesmt_table[1].engenheiro_seg) * gruposAcima5000;
                            }
                            //
                            if (sesmt_table[1].aux_tec_enfermagem.indexOf('*') >= 0) {
                                respostaConsultaTabelas.obsSesmt1 = true;
                                respostaConsultaTabelas.auxTecEnfermagem = sesmt_table[0].aux_tec_enfermagem + ' + ' + (parseInt(sesmt_table[1].aux_tec_enfermagem) * gruposAcima5000) + '*';
                            } else {
                                respostaConsultaTabelas.auxTecEnfermagem = parseInt(sesmt_table[0].aux_tec_enfermagem) + parseInt(sesmt_table[1].aux_tec_enfermagem) * gruposAcima5000;
                            }
                            //
                            if (sesmt_table[1].enfermeiro.indexOf('*') >= 0) {
                                respostaConsultaTabelas.obsSesmt1 = true;
                                respostaConsultaTabelas.enfermeiro = sesmt_table[0].enfermeiro + ' + ' + (parseInt(sesmt_table[1].enfermeiro) * gruposAcima5000) + '*';
                            } else {
                                respostaConsultaTabelas.enfermeiro = parseInt(sesmt_table[0].enfermeiro) + parseInt(sesmt_table[1].enfermeiro) * gruposAcima5000;
                            }
                            //
                            if (sesmt_table[1].medico.indexOf('*') >= 0) {
                                respostaConsultaTabelas.obsSesmt1 = true;
                                respostaConsultaTabelas.medico = sesmt_table[0].medico + ' + ' + (parseInt(sesmt_table[1].medico) * gruposAcima5000) + '*';
                            } else {
                                respostaConsultaTabelas.medico = parseInt(sesmt_table[0].medico) + parseInt(sesmt_table[1].medico) * gruposAcima5000;
                            }

                            respostaConsultaTabelas.obsSesmt2 = true;

                        }
                        else {
                            //se ocorreu algum erro, preenche informações para retornar ao front
                            status_consulta = 55; // Não foi possível realizar correspondência na tabela SESMT
                            respostaConsultaTabelas.status = 400;
                            respostaConsultaTabelas.erro = true;
                            respostaConsultaTabelas.mensagem = 'Erro: Nenhum valor encontrado da base de dados da equipe SESMT.'
                        }
                    }
                    else {
                        const sesmt_table = dimensionamento_sesmt.find(
                            item => (
                                item.grau_risco == respostaConsultaTabelas.maiorGrauRisco
                                && item.nro_trabalhadores_max >= respostaConsultaTabelas.nroTrabalhadores
                                && item.nro_trabalhadores_min <= respostaConsultaTabelas.nroTrabalhadores))

                        if (sesmt_table) {
                            //sesmt_table.push(tableItem)
                            //console.log("Sesmt encontrado:", sesmt_table)
                        }
                        else {
                            //console.log("Sesmt não encontrado:")
                        }

                        //console.log("SESMT TABLE:", sesmt_table)

                        if (sesmt_table) {
                            //se deu tudo certo, atribui os valores consultados a variável de resposta
                            respostaConsultaTabelas.nroTrabalhadoresMinSesmt = sesmt_table.nro_trabalhadores_min;
                            respostaConsultaTabelas.nroTrabalhadoresMaxSesmt = sesmt_table.nro_trabalhadores_max;
                            respostaConsultaTabelas.tecnicoSeg = sesmt_table.tecnico_seg;
                            respostaConsultaTabelas.engenheiroSeg = sesmt_table.engenheiro_seg;
                            respostaConsultaTabelas.auxTecEnfermagem = sesmt_table.aux_tec_enfermagem;
                            respostaConsultaTabelas.enfermeiro = sesmt_table.enfermeiro;
                            respostaConsultaTabelas.medico = sesmt_table.medico;

                            const str = JSON.stringify(respostaConsultaTabelas);

                            //verifica se há algum valor com observação (*)
                            if (str.indexOf('"1***"') >= 0)
                                respostaConsultaTabelas.obsSesmt3 = true;
                            if (str.indexOf('"1*"') >= 0)
                                respostaConsultaTabelas.obsSesmt1 = true;

                        } else {
                            //se ocorreu algum erro, preenche informações para retornar ao front
                            status_consulta = 55; // Não foi possível realizar correspondência na tabela SESMT
                            respostaConsultaTabelas.status = 400;
                            respostaConsultaTabelas.erro = true;
                            respostaConsultaTabelas.mensagem = 'Erro: Nenhum valor encontrado da base de dados da equipe SESMT.'
                        }
                    }
                }

                if (!respostaConsultaTabelas.erro && consulta != 'gr') {
                    if (respostaConsultaTabelas.nroTrabalhadores > 10000) {
                        //calcula fator de multiplicação para grupos acima de 5000
                        var gruposAcima10000 = Math.floor((respostaConsultaTabelas.nroTrabalhadores - 10000) / 2500);
                        //console.log('CIPA: ' + gruposAcima10000.toString());

                        const cipa_table = dimensionamento_cipa.filter(
                            item => (
                                item.grau_risco == respostaConsultaTabelas.maiorGrauRisco
                                && item.nro_trabalhadores_max >= 10000
                            )
                        )

                        if (cipa_table) {
                            //se deu tudo certo, atribui os valores consultados a variável de resposta
                            respostaConsultaTabelas.nroTrabalhadoresMinCipa = cipa_table[0].nro_trabalhadores_min;
                            respostaConsultaTabelas.nroTrabalhadoresMaxCipa = cipa_table[0].nro_trabalhadores_max;
                            respostaConsultaTabelas.cipaEfetivos = parseInt(cipa_table[0].integrantes_efetivos) + parseInt(cipa_table[1].integrantes_efetivos) * gruposAcima10000;
                            respostaConsultaTabelas.cipaSuplentes = parseInt(cipa_table[0].integrantes_suplentes) + parseInt(cipa_table[1].integrantes_suplentes) * gruposAcima10000;

                            //Última consulta, escreve mensagem de aprovação
                            respostaConsultaTabelas.mensagem = 'Todos dados consultados com sucesso'
                        }
                        else {
                            //se ocorreu algum erro, preenche informações para retornar ao front
                            status_consulta = 56; // Não foi possível realizar correspondência na tabela CIPA
                            respostaConsultaTabelas.status = 400;
                            respostaConsultaTabelas.erro = true;
                            respostaConsultaTabelas.mensagem = 'Erro: Nenhum valor encontrado da base de dados da equipe CIPA.'
                        }
                    }
                    else {
                        const cipa_table = dimensionamento_cipa.filter(
                            item => (
                                item.grau_risco == respostaConsultaTabelas.maiorGrauRisco
                                && item.nro_trabalhadores_max >= respostaConsultaTabelas.nroTrabalhadores
                                && item.nro_trabalhadores_min <= respostaConsultaTabelas.nroTrabalhadores
                            )
                        )

                        if (cipa_table) {
                            //console.log("CIPA TABLE < 10000:", cipa_table)
                            //se deu tudo certo, atribui os valores consultados a variável de resposta
                            respostaConsultaTabelas.nroTrabalhadoresMinCipa = cipa_table[0].nro_trabalhadores_min;
                            respostaConsultaTabelas.nroTrabalhadoresMaxCipa = cipa_table[0].nro_trabalhadores_max;
                            respostaConsultaTabelas.cipaEfetivos = cipa_table[0].integrantes_efetivos;
                            respostaConsultaTabelas.cipaSuplentes = cipa_table[0].integrantes_suplentes;

                            //Última consulta, escreve mensagem de aprovação
                            respostaConsultaTabelas.mensagem = 'Todos dados consultados com sucesso'
                        } else {
                            //se ocorreu algum erro, preenche informações para retornar ao front
                            status_consulta = 56; // Não foi possível realizar correspondência na tabela CIPA
                            respostaConsultaTabelas.status = 400;
                            respostaConsultaTabelas.erro = true;
                            respostaConsultaTabelas.mensagem = 'Erro: Nenhum valor encontrado da base de dados da equipe CIPA.'
                        }
                    }
                }



                res.status(201).json(respostaConsultaTabelas);
            } catch (error) {
                res.status(500).json({ error: `Erro: ${error}` });
            }
        } else {
            res.status(400).json({ error: "Informações faltantes na requisição." });
        }
    } else {
        res.status(405).json({ error: "Método da requisição não permitido." });
    }
}