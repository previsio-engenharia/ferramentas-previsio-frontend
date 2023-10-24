//react
import React, { useState } from 'react';
import { useRef } from 'react';

// funções
import { updateResponseState, validateAndSendForm } from 'lib/consultaApi';

//mui
import { Button, Grid, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material';

//components
import FormCnpj from 'components/FormCnpj';
import FormCnae from 'components/FormCnae';
import CardResponse from 'components/card-response';
import CardExplicaConsulta from 'components/card-explica-consulta';
import CardAvisoTestes from 'components/card-aviso-testes';
import Head from 'next/head';

export default function ConsultaGR() {
    //ref utilizada para fazer scroll da tela para a área da resposta
    const targetRef = useRef(null);

    //dados do formulário (tanto cnpj quanto cnaes)
    const [dataForm, setDataForm] = useState({
        consulta: 'gr',
        cnpj: '',
        codigo_cnae1: '',
        codigo_cnae2: '',
        numero_trabalhadores: '',
        type: 'cnpj',
        receberEmail: true,
        userEmail: ''
    });

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

    //estado para salvar a resposta da consulta
    const [respostaConsulta, setRespostaConsulta] = useState()

    const consultaTabelas = async e => {
        e.preventDefault();
        //console.log("Consulta tabelas:")

        setLoadingResponse(true);
        //realiza a consulta assíncrona
        const respostaConsultaTabelas = await validateAndSendForm(dataForm)
        setLoadingResponse(false);

        //console.log(respostaConsultaTabelas);
        if (respostaConsultaTabelas) {
            //atualiza campos com a resposta
            updateResponseState(respostaConsultaTabelas, setStatusResponse, setRespostaConsulta)
            //limpa dados da consulta realizada
            setDataForm((previousState) => ({
                ...previousState,
                //consulta: 'gr',
                cnpj: '',
                codigo_cnae1: '',
                codigo_cnae2: '',
                numero_trabalhadores: '',
                //type: 'cnpj',
                //receberEmail: true,
                //userEmail: ''
            }));
            //scroll da tela para área da resposta
            targetRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            <Head>
                <meta name="description" content="Previsio Engenharia: Consulta GR: Grau de Risco" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="keywords" content="grau de risco, nr04, consulta grau de risco"></meta>
                <title>Consulta GR - Previsio Engenharia</title>
            </Head>
            <Grid container >
                {/*titulo da pagina e aviso*/}
                <Grid item xs={12}>
                    <Typography
                        color='primary'
                        variant='h2'
                        component='h1'
                        textAlign='center'
                        sx={{
                            mb: 2,
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        Consulta Grau de Risco
                    </Typography>
                    <CardAvisoTestes />
                </Grid>
                {/*aviso de testes*/}

                {/*texto grau de risco*/}
                <Grid item xs={12} sm={12} md={6}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        px:2
                    }}
                >
                    
                    <CardExplicaConsulta
                        title={'GR: GRAU DE RISCO'}
                        text={'O Grau de Risco de uma empresa é definido na NR04, classificado em 4 níveis, de 1 a 4, e indica a intensidade dos riscos de caráter físico, químico, biológico, ergonômicos e acidentais que os trabalhadores podem estar expostos.'}
                        link={'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-04-atualizada-2022-2-1.pdf'}
                    />
                </Grid>
                {/*formulario de consulta*/}
                <Grid item xs={12} sm={12} md={6} 
                    sx={{ px: 2}} 
                >
                    <Typography
                        variant='h6'
                        component='h2'
                        textAlign='center'
                        sx={{ p:2 }}
                    >
                        Consultas: Grau de Risco
                    </Typography>
                    <Typography
                        paragraph
                        align='justify'
                        //sx={{ pt: 2, px: 2 }}
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

                    <Grid item xs={12} component={'form'} onSubmit={consultaTabelas} sx={{ p: 2 }}>
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
                                disabled={statusResponse.loading}
                            >
                                Consultar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* área de resposta */}
                <Grid ref={targetRef} item xs m={2}>
                    {
                        statusResponse.loading ? (
                            <Stack spacing={2}>
                                <Skeleton variant="rounded" animation="wave" height={32} />
                                <Skeleton variant="rounded" animation="wave" height={16} />
                                <Skeleton variant="rounded" animation="wave" height={16} />
                                <Skeleton variant="rounded" animation="wave" height={16} />
                            </Stack>
                        ) : (
                            statusResponse.status == 'error' || statusResponse.status == 'success' ? (
                                <CardResponse statusResponse={statusResponse} dados={respostaConsulta} />
                            ) : (null)
                        )
                    }
                </Grid>
            </Grid>
        </>

    )
}