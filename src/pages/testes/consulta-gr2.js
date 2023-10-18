import React, { useState, createContext } from 'react';
import Head from 'next/head';
import InputMask from 'react-input-mask';
import ContentLoader, { List } from 'react-content-loader';

import Menu from 'components/Menu';
import AvisoTestes from 'components/AvisoTestes'
import RespostaErro from 'components/RespostaErro'
import RespostaGrSucesso from 'components/RespostaGrSucesso'
import Footer from 'components/Footer';
import { mostrarCnae, mostrarCnpj } from 'lib/custom';
import { Box, Button, Grid, Paper, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material';
import FormCnpj from 'components/FormCnpj';
import FormCnae from 'components/FormCnae';

function ConsultaGR() {
    //dados do formulário (tanto cnpj quanto cnaes)
    const [dataForm, setDataForm] = useState({
        consulta: 'gr',
        cnpj: '',
        codigo_cnae1: '',
        codigo_cnae2: '',
        type: 'cnpj',
        receberEmail: true,
        userEmail: ''
    });
    //estado aguarda resposta da consulta
    //const [loading, setLoading] = useState(false);

    //status da resposta da consulta
    const [statusResponse, setStatusResponse] = useState({
        loading: false,
        status: '',
        message: ''
    });
    // função pra atualizar o loading da resposta
    const setLoadingResponse = (status) => {
        setStatusResponse((previousState) => ({
            ...previousState,
            loading: status
        }))
    }

    /*
        const [response, setResponse] = useState({
            type: '',
            mensagem: ''
        });
    */

    const [respostaDadosNR, setRespostaDadosNR] = useState({
        tipo_consulta: '',
        id_registro: '',
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        cod_cnae: '',
        desc_cnae: '',
        codigoCnaeFiscal: '',
        descricaoCnaeFiscal: '',
        grau_risco: '',
        nro_trabalhadores: '',
        faixa_nro_trabalhadores_sesmt: '',
        nro_tecnico_seg: '',
        nro_engenheiro_seg: '',
        nro_aux_tec_enfermagem: '',
        nro_enfermeiro: '',
        nro_medico: '',
        faixa_nro_trabalhadores_cipa: '',
        cipa_efetivos: '',
        cipa_suplentes: '',
        obsSesmt1: '',
        obsSesmt2: '',
        obsSesmt3: '',
        dispensaPGR: '',
        porte: '',
        dateTimeReport: ''
    });

    const [respostaConsulta, setRespostaConsulta] = useState()

    const sendInfo = async e => {
        //inicia placeholder
        //setLoading(true);
        setLoadingResponse(true);

        //indica que não deve recarregar a página
        e.preventDefault();

        //verifica inicialmente se o CNPJ foi inserido corretamente
        if (dataForm.type == 'cnpj') {
            const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
            //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
            //necessário checar se o tamanho está correto. Checado com o regex
            if (!dataForm.cnpj.match(cnpjRegex)) {
                alert('Erro: Insira o CNPJ no formato correto.');
                //setResponse({loading: false}); 
                //setLoading(false);
                setLoadingResponse(false);
                return
            }
            else {
                dataForm.codigo_cnae1 = '';
                dataForm.codigo_cnae2 = '';
            }
        } else if (dataForm.type == 'cnae') {
            //verifica se o cnae foi inserido corretamente
            var cnaeRegex = /^\d{1,2}\.\d{1,2}-\d{1}/;
            //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
            //necessário checar se o tamanho está correto. Checado com o regex
            if (!dataForm.codigo_cnae1.match(cnaeRegex) && !dataForm.codigo_cnae2.match(cnaeRegex)) {
                alert('Erro: Insira um código CNAE válido');
                //setResponse({loading: false});
                //setLoading(false);
                setLoadingResponse(false)
                return
            }
            else {
                dataForm.cnpj = '';
            }
        } else {
            //dá falha se não reconhecer nem cnpj nem cnae
            alert('Erro: Falha no envio do formulário');
            //setLoading(false);
            setLoadingResponse(false);
            return
        }

        if (dataForm.receberEmail) {
            const emailRegex = /\S+@\S+\.\S+/
            if (!dataForm.userEmail.match(emailRegex)) {
                alert('Erro: Insira um e-mail válido.');
                //setResponse({loading: false}); 
                //setLoading(false);
                setLoadingResponse(false);
                return
            }
        }

        console.log("Vai tentar chamar a api")

        //se deu certo até aqui, realiza o POST
        try {
            const res = await fetch('/api/novaApi', {
                //const res = await fetch(process.env.SERVER_URL + 'nr04-05-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });

            const respostaConsultaTabelas = await res.json();
            console.log("RESPOSTA:", respostaConsultaTabelas);

            if (!respostaConsultaTabelas.success) {
                setStatusResponse((previousState) => ({
                    ...previousState,
                    status: 'error',
                    message: respostaConsultaTabelas.mensagem
                }))
            }
            else {
                /*
                        if (dataForm.type == 'cnpj') {
                            setRespostaDadosNR({
                                tipo_consulta: respostaConsultaTabelas.tipo_consulta,
                                id_registro: respostaConsultaTabelas.id_registro,
                                cod_cnae: respostaConsultaTabelas.codigoCnaeFiscal,
                                desc_cnae: respostaConsultaTabelas.descricaoCnaeFiscal,
                                cnpj: respostaConsultaTabelas.cnpj,
                                razaoSocial: respostaConsultaTabelas.razaoSocial,
                                nomeFantasia: respostaConsultaTabelas.nomeFantasia,
                                grau_risco: respostaConsultaTabelas.maiorGrauRisco,
                                nro_trabalhadores: respostaConsultaTabelas.nroTrabalhadores,
                                faixa_nro_trabalhadores_sesmt: 'entre ' + respostaConsultaTabelas.nroTrabalhadoresMinSesmt + ' e ' + respostaConsultaTabelas.nroTrabalhadoresMaxSesmt,
                                nro_tecnico_seg: respostaConsultaTabelas.tecnicoSeg,
                                nro_engenheiro_seg: respostaConsultaTabelas.engenheiroSeg,
                                nro_aux_tec_enfermagem: respostaConsultaTabelas.auxTecEnfermagem,
                                nro_enfermeiro: respostaConsultaTabelas.enfermeiro,
                                nro_medico: respostaConsultaTabelas.medico,
                                faixa_nro_trabalhadores_cipa: 'entre ' + respostaConsultaTabelas.nroTrabalhadoresMinCipa + ' e ' + respostaConsultaTabelas.nroTrabalhadoresMaxCipa,
                                cipa_efetivos: respostaConsultaTabelas.cipaEfetivos,
                                cipa_suplentes: respostaConsultaTabelas.cipaSuplentes,
                                obsSesmt1: respostaConsultaTabelas.obsSesmt1,
                                obsSesmt2: respostaConsultaTabelas.obsSesmt2,
                                obsSesmt3: respostaConsultaTabelas.obsSesmt3,
                                dispensaPGR: respostaConsultaTabelas.dispensaPGR,
                                porte: respostaConsultaTabelas.porte,
                                dateTimeReport: respostaConsultaTabelas.dateTimeReport
                            });
                        } else if (dataForm.type == 'cnae') {
                            setRespostaDadosNR({
                                tipo_consulta: respostaConsultaTabelas.tipo_consulta,
                                id_registro: respostaConsultaTabelas.id_registro,
                                cod_cnae: respostaConsultaTabelas.codigoCnae,
                                desc_cnae: respostaConsultaTabelas.descricaoCnae,
                                cnpj: respostaConsultaTabelas.cnpj,
                                razaoSocial: respostaConsultaTabelas.razaoSocial,
                                nomeFantasia: respostaConsultaTabelas.nomeFantasia,
                                grau_risco: respostaConsultaTabelas.graudeRisco,
                                nro_trabalhadores: respostaConsultaTabelas.nroTrabalhadores,
                                faixa_nro_trabalhadores_sesmt: 'entre ' + respostaConsultaTabelas.nroTrabalhadoresMinSesmt + ' e ' + respostaConsultaTabelas.nroTrabalhadoresMaxSesmt,
                                nro_tecnico_seg: respostaConsultaTabelas.tecnicoSeg,
                                nro_engenheiro_seg: respostaConsultaTabelas.engenheiroSeg,
                                nro_aux_tec_enfermagem: respostaConsultaTabelas.auxTecEnfermagem,
                                nro_enfermeiro: respostaConsultaTabelas.enfermeiro,
                                nro_medico: respostaConsultaTabelas.medico,
                                faixa_nro_trabalhadores_cipa: 'entre ' + respostaConsultaTabelas.nroTrabalhadoresMinCipa + ' e ' + respostaConsultaTabelas.nroTrabalhadoresMaxCipa,
                                cipa_efetivos: respostaConsultaTabelas.cipaEfetivos,
                                cipa_suplentes: respostaConsultaTabelas.cipaSuplentes,
                                obsSesmt1: respostaConsultaTabelas.obsSesmt1,
                                obsSesmt2: respostaConsultaTabelas.obsSesmt2,
                                obsSesmt3: respostaConsultaTabelas.obsSesmt3,
                                dateTimeReport: respostaConsultaTabelas.dateTimeReport
                            });
                        }
                */

                setRespostaConsulta(respostaConsultaTabelas)

                setStatusResponse({
                    loading: false,
                    status: 'success',
                    message: respostaConsultaTabelas.mensagem
                })

                //limpa dados da consulta realizada
                setDataForm((previousState) => ({
                    ...previousState,
                    //consulta: 'gr',
                    cnpj: '',
                    codigo_cnae1: '',
                    codigo_cnae2: '',
                    //type: 'cnpj',
                    //receberEmail: true,
                    //userEmail: ''
                }));
            }
        } catch (err) {
            setLoadingResponse(false);
            console.log(err);
        }
        setLoadingResponse(false);
        //document.getElementById("resultado-consulta").scrollIntoView({ block: "center", behavior: "smooth" })
    }

    return (
        <>
            <Grid container spacing={2}>
                {/*titulo da pagina*/}
                <Grid item xs={12}>
                    <Typography
                        variant='h3'
                        component='h1'
                        textAlign='center'
                        sx={{
                            display: { xs: 'none', md: 'block' }
                        }}
                    //sx={{ fontSize: { xs: 14, sm: 18, md: 24, lg: 36 } }}
                    >
                        Consulta Grau de Risco
                    </Typography>
                </Grid>
                {/*texto grau de risco*/}
                <Grid item xs={12} sm={12} md={6}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Typography variant='h6' component='h2' textAlign={'center'}>
                        GR: GRAU DE RISCO
                    </Typography>
                    <Typography
                        paragraph
                        align='justify'
                        sx={{ py: 2, px: 2 }}>
                        O Grau de Risco de uma empresa é definido na NR04, classificado em 4 níveis, de 1 a 4, e indica a intensidade dos riscos de caráter físico, químico, biológico, ergonômicos e acidentais que os trabalhadores podem estar expostos.
                    </Typography>
                </Grid>
                {/*formulario de consulta*/}
                <Grid item xs={12} sm={12} md={6}>
                    <Typography
                        variant='h6'
                        component='h2'
                        textAlign='center'
                    >
                        Consulta Grau de Risco
                    </Typography>
                    <Typography
                        paragraph
                        align='justify'
                        sx={{ py: 2, px: 2 }}
                    >
                        Com esta ferramenta é possível descobrir rapidamente o grau de risco de uma empresa de acordo com as normas vigentes. Indique o CNPJ da empresa que deseja consultar. Caso não seja possível consultar o CNPJ, há a opção de consultar diretamente com o CNAE desejado.
                    </Typography>
                    <Tabs
                        centered
                        variant="fullWidth"
                        value={dataForm.type}
                        //onChange={(e, newValue) => { setFormOption({newValue}) }}
                        onChange={(e, newValue) => {
                            setDataForm((previousState) => ({
                                ...previousState,
                                type: newValue
                            })
                            )
                        }}
                    >
                        <Tab label="CNPJ" value='cnpj' />
                        <Tab label="CNAE" value='cnae' />
                    </Tabs>

                    <Grid item xs={12} component={'form'} onSubmit={sendInfo} sx={{ p: 2 }}>
                        {
                            dataForm.type == 'cnpj' ?
                                (<FormCnpj dataForm={dataForm} setDataForm={setDataForm} />)
                                : (<FormCnae dataForm={dataForm} setDataForm={setDataForm} />)
                        }
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                type='submit'
                            >
                                Consultar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* área de resposta */}
                <Grid item xs>
                    {
                        statusResponse.loading ? (
                            <>
                                <Stack spacing={2}>
                                    <Skeleton variant="rounded" animation="wave" height={32} />
                                    <Skeleton variant="rounded" animation="wave" height={16} />
                                    <Skeleton variant="rounded" animation="wave" height={16} />
                                    <Skeleton variant="rounded" animation="wave" height={16} />
                                </Stack>
                            </>
                        ) : (
                            statusResponse.status == 'error' ? (
                                <RespostaErro dados={statusResponse} />
                            ) :
                                statusResponse.status == 'success' ? (
                                    <>
                                        <RespostaGrSucesso dados={respostaConsulta} />
                                    </>
                                ) : (null)
                        )
                    }
                </Grid>
            </Grid>
        </>
    )
}
export default ConsultaGR;