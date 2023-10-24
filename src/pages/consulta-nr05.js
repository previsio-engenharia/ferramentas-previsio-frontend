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

export default function ConsultaNR05() {
    //ref utilizada para fazer scroll da tela para a área da resposta
    const targetRef = useRef(null);

    //dados do formulário (tanto cnpj quanto cnaes)
    const [dataForm, setDataForm] = useState({
        consulta: 'nr05',
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
                <meta name="description" content="Previsio Engenharia: Consulta NR-05: Constituição de Equipe CIPA" />
                <title>Consulta NR05 - Previsio Engenharia</title>
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
                        Consulta NR05: Equipe CIPA
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
                        title={'NR05'}
                        text={'Esta Norma estabelece os parâmetros e os requisitos da Comissão Interna de Prevenção de Acidentes – CIPA, tendo por objetivo a prevenção de acidentes e doenças relacionadas ao trabalho, de modo a tornar compatível, permanentemente, o trabalho com a preservação da vida e promoção da saúde do trabalhador.'}
                        link={'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-05-atualizada-2022.pdf'}
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
                        Composição da Equipe da CIPA
                    </Typography>
                    <Typography
                        paragraph
                        align='justify'
                        //sx={{ pt: 2, px: 2 }}
                    >
                        Com esta ferramenta, é possível descobrir rapidamente a composição necessária da equipe da CIPA, conforme orientado pelas normas vigentes. Indique o CNPJ e o número de funcionários da empresa que deseja consultar. Caso não seja possível consultar o CNPJ, há a opção de consultar diretamente com o CNAE desejado.
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