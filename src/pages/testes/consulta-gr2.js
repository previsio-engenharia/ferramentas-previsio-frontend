import React, { useState, createContext } from 'react';
import Head from 'next/head';
import InputMask from 'react-input-mask';
import ContentLoader, { List } from 'react-content-loader';

import Menu from 'components/Menu';
import AvisoTestes from 'components/AvisoTestes'
import RespostaErro from 'components/RespostaErro'
import RespostaGrCnpj from 'components/RespostaGrCnpj'
import RespostaGrCnae from 'components/RespostaGrCnae'
import Footer from 'components/Footer';
import { mostrarCnae, mostrarCnpj } from 'lib/custom';
import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';

function ConsultaGR() {

    const [formOption, setFormOption] = useState('cnpj')

    const [loading, setLoading] = useState(false);

    const [dataForm, setDataForm] = useState({
        consulta: 'gr',
        cnpj: '',
        codigo_cnae1: '',
        codigo_cnae2: '',
        type: '',
        userEmail: ''
    });

    const [response, setResponse] = useState({
        type: '',
        mensagem: ''
    });

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

    const onChangeInput = e => setDataForm({ ...dataForm, [e.target.name]: e.target.value });

    const sendInfo = async e => {
        //inicia placeholder
        setLoading(true);

        //indica que não deve recarregar a página
        e.preventDefault();

        if (dataForm.userEmail.length > 0) {
            var emailRegex = /\S+@\S+\.\S+/
            if (!dataForm.userEmail.match(emailRegex)) {
                alert('Erro: Insira um e-mail válido.');
                //setResponse({loading: false}); 
                setLoading(false);
                return
            }
        }

        //verifica inicialmente se o CNPJ foi inserido corretamente
        if (dataForm.type == 'cnpj') {
            var cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
            //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
            //necessário checar se o tamanho está correto. Checado com o regex
            if (!dataForm.cnpj.match(cnpjRegex)) {
                alert('Erro: Insira o CNPJ no formato correto.');
                //setResponse({loading: false}); 
                setLoading(false);
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
                setLoading(false);
                return
            }
            else {
                dataForm.cnpj = '';
            }
        } else {
            //dá falha se não reconhecer nem cnpj nem cnae
            alert('Erro: Falha no envio do formulário');
            setLoading(false);
            return
        }

        console.log("Vai tentar chamar a api")

        //se deu certo até aqui, realiza o POST
        try {
            const res = await fetch('/api/consultacnpj', {
                //const res = await fetch(process.env.SERVER_URL + 'nr04-05-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });

            const respostaConsultaTabelas = await res.json();
            console.log("RESPOSTA:", respostaConsultaTabelas);

            if (respostaConsultaTabelas.erro) {
                setResponse({
                    type: 'error',
                    mensagem: respostaConsultaTabelas.mensagem
                });
            }
            else {
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
                setResponse({
                    type: 'success',
                });
                setDataForm({
                    consulta: 'gr',
                    cnpj: '',
                    codigo_cnae1: '',
                    codigo_cnae2: '',
                    //numero_trabalhadores: '',
                    type: '',
                    userEmail: ''
                });
            }
        } catch (err) {
            setLoading(false);
            setResponse({
                type: 'error',
                mensagem: 'Erro: não foi possível realizar a consulta. Tente novamente mais tarde.'
            });
            console.log(err);
        }
        setLoading(false);
        document.getElementById("resultado-consulta").scrollIntoView({ block: "center", behavior: "smooth" })
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h3' component='h1' textAlign={'center'}>
                        Consulta Grau de Risco
                    </Typography>
                </Grid>
                <Grid item xs={0} sm={12} md={6}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant='h6' component='h2' textAlign={'center'}>
                        Normas Regulamentadoras (NRs)
                    </Typography>
                    <Typography variant='body1' component='p' textAlign={'center'} sx={{ py: 2, px: 2 }}>
                        Lorem ipsum feugiat tincidunt aliquam mollis elit semper, metus tristique lectus himenaeos pharetra arcu ad proin, ut mattis nibh viverra est dictumst. tempor aliquam sociosqu interdum pretium leo gravida himenaeos vulputate faucibus, maecenas pharetra tristique mi ultrices tortor vitae diam senectus aptent, iaculis duis et faucibus phasellus ornare curabitur auctor. ultrices cursus enim placerat sodales massa iaculis a laoreet mollis vulputate, neque id vivamus nullam interdum eros pellentesque tincidunt nam. torquent semper elit gravida bibendum egestas aliquet metus quam, commodo nec venenatis varius in pretium molestie, fames curae purus id potenti vivamus aliquam.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant='h6' component='h2' textAlign={'center'}>
                        Ferramentas de Consultas
                    </Typography>
                    <Typography variant='body1' sx={{ py: 2, px: 2 }}>
                        Disponibilizamos ferramentas para consulta de dados das NRs.
                    </Typography>
                    <Tabs 
                        centered 
                        variant="fullWidth"
                        onChange={(e, newValue)=>{setFormOption(newValue)}} 
                    >
                        <Tab label="CNPJ" value='cnpj'/>
                        <Tab label="CNAE" value='cnae'/>
                    </Tabs>
                    <Grid item container xs={12}>
                        {
                            formOption == 'cnpj' ?
                            (<>cnpj</>):
                            (<>cnae</>)
                        }







                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default ConsultaGR;