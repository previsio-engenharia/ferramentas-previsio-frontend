import React, { useState, createContext } from 'react';
import Head from 'next/head';
import InputMask from 'react-input-mask';
import ContentLoader, {List} from 'react-content-loader';

import Menu from 'components/Menu';
import AvisoTestes from 'components/AvisoTestes'
import RespostaErro from 'components/RespostaErro'
import RespostaGrCnpj from 'components/RespostaGrCnpj'
import RespostaGrCnae from 'components/RespostaGrCnae'
import Footer from 'components/Footer';
import { mostrarCnae, mostrarCnpj } from 'lib/custom';

function ConsultaGR(){

    const [loading, setLoading] = useState(false);

    const [dataForm, setDataForm] = useState({
        consulta: 'gr',
        cnpj: '',
        codigo_cnae1: '',
        codigo_cnae2: '',
        //numero_trabalhadores: '',
        type: '',
        userEmail: ''
    });

    const [response, setResponse] = useState({
        type: '',
        mensagem: ''
    });

    var [respostaDadosNR, setRespostaDadosNR] = useState({
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

    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});

    const sendInfo = async e => {
        //inicia placeholder
        setLoading(true);

        //indica que não deve recarregar a página
        e.preventDefault();

        
        if(dataForm.userEmail.length > 0){
            var emailRegex = /\S+@\S+\.\S+/
            if(!dataForm.userEmail.match(emailRegex)){
                alert('Erro: Insira um e-mail válido.');
                //setResponse({loading: false}); 
                setLoading(false);
                return
            }
        }       
       
        //verifica inicialmente se o CNPJ foi inserido corretamente
        if(dataForm.type == 'cnpj'){
            var cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
            //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
            //necessário checar se o tamanho está correto. Checado com o regex
            if(!dataForm.cnpj.match(cnpjRegex)){
                alert('Erro: Insira o CNPJ no formato correto.');
                //setResponse({loading: false}); 
                setLoading(false);
                return
            }
            else{
                dataForm.codigo_cnae1 = '';
                dataForm.codigo_cnae2 = '';
            }
        }else if(dataForm.type == 'cnae'){
            //verifica se o cnae foi inserido corretamente
            var cnaeRegex = /^\d{1,2}\.\d{1,2}-\d{1}/;
            //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
            //necessário checar se o tamanho está correto. Checado com o regex
            if(!dataForm.codigo_cnae1.match(cnaeRegex) && !dataForm.codigo_cnae2.match(cnaeRegex)){
                alert('Erro: Insira um código CNAE válido');
                //setResponse({loading: false});
                setLoading(false); 
                return                                
            }
            else{
                dataForm.cnpj = '';
            }
        }else{
            //dá falha se não reconhecer nem cnpj nem cnae
            alert('Erro: Falha no envio do formulário');
            setLoading(false);
            return
        }

        console.log("Vai tentar chamar a api")
        
        //se deu certo até aqui, realiza o POST
        try{
            const res = await fetch('/api/consultacnpj', {
            //const res = await fetch(process.env.SERVER_URL + 'nr04-05-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });
            
            const respostaConsultaTabelas = await res.json();
            console.log("RESPOSTA:", respostaConsultaTabelas);
            
            if(respostaConsultaTabelas.erro){
                setResponse({
                    type:'error',
                    mensagem: respostaConsultaTabelas.mensagem                        
                });
            }
            else{                
                
                if(dataForm.type=='cnpj'){
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
                }else if(dataForm.type=='cnae'){
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
                    type:'success',
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
        }catch(err){  
            setLoading(false);    
            setResponse({
                type:'error',
                mensagem:'Erro: não foi possível realizar a consulta. Tente novamente mais tarde.'
            });            
            console.log(err);
        }
        setLoading(false);
        document.getElementById("resultado-consulta").scrollIntoView({block: "center", behavior: "smooth"})
    }

    return(
        <div>
            <Head>
                <meta name="description" content="Previsio Engenharia: Consulta GR: Grau de Risco"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="keywords" content="grau de risco, nr04, consulta grau de risco"></meta>
                <title>Consulta GR - Previsio Engenharia</title>
            </Head>

            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Consulta GR: Grau de Risco</h2>
                    <AvisoTestes/>
                    <div className='contact-content'>
                        <div className='column left'>
                            <div className='bloco-explicacao'>
                                <h3 className='titulo-consulta'>GR: GRAU DE RISCO</h3>
                                <p>O Grau de Risco de uma empresa é definido na NR04, classificado em 4 níveis, de 1 a 4, e indica a intensidade dos riscos de caráter físico, químico, biológico, ergonômicos e acidentais que os trabalhadores podem estar expostos.</p>
                                <a target="_blank" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-04.pdf"><i className="fa-sharp fa-solid fa-arrow-right"></i> Acesse a norma completa</a>
                            </div>
                        </div>

                        <div className='column right'>
                            <div className='titulo-consulta'>
                                Consultas: Grau de Risco                         
                            </div>
                            <p>Com esta ferramenta é possível descobrir rapidamente o grau de risco de uma empresa de acordo com as normas vigentes. Indique o CNPJ da empresa que deseja consultar. Caso não seja possível consultar o CNPJ, há a opção de consultar diretamente com o CNAE desejado.</p>
                            <div>
                                <button className='selecionaEntrada btnCNPJ' onClick={mostrarCnpj}>Consultar com CNPJ</button>
                                <button className='selecionaEntrada btnCNAE' onClick={mostrarCnae}>Consultar com CNAE</button>
                            </div>
                            
                            <form className='formCNPJ' onSubmit={sendInfo}>
                                <div className='fields'>
                                    <div className='field'>
                                    <InputMask type="text" name="cnpj" mask="99.999.999/9999-99" placeholder="Digite o CNPJ da empresa" onChange={onChangeInput} value={dataForm.cnpj}/>
                                    </div>
                                </div>
                                <div className='label'>
                                    <p>Deseja receber por e-mail o relatório da consulta? (opcional)</p>
                                </div>
                                <div className='fields'>
                                    <div className='field'>
                                        <input className='inputEmail' type='text' name="userEmail" placeholder="Digite seu e-mail" onChange={onChangeInput} value={dataForm.userEmail}/>
                                    </div>
                                </div>
                                <div className='button-area'>
                                    <button type="submit" onClick={()=>{dataForm.type='cnpj';}}>Consultar</button>
                                </div>                                
                            </form>

                            <form className='formCNAE' onSubmit={sendInfo}>
                                <div className='fields'>
                                    <div className='field name tooltip'>
                                        <span className='tooltiptext'>A atividade econômica principal é a constante no Cadastro Nacional de  Pessoa Jurídica - CNPJ.</span>
                                        <InputMask type="text" name="codigo_cnae1" placeholder="Digite o CNAE principal da empresa" mask="99.99-9" onChange={onChangeInput} value={dataForm.codigo_cnae1}/>
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field name tooltip'>
                                        <span className='tooltiptext'>A atividade econômica preponderante é aquela que ocupa o maior número de trabalhadores.</span>
                                        <InputMask type="text" name="codigo_cnae2" placeholder="Digite o CNAE preponderante da empresa" mask="99.99-9" onChange={onChangeInput} value={dataForm.codigo_cnae2}/>
                                    </div>
                                </div>
                                <div className='label'>
                                    <p>Deseja receber por e-mail o relatório da consulta? (opcional)</p>
                                </div>                          
                                <div className='fields'>
                                    <div className='field'>
                                        <input type='text' name="userEmail" placeholder="Digite seu e-mail" onChange={onChangeInput} value={dataForm.userEmail}/>
                                    </div>
                                </div>
                                <div className='button-area'>
                                    <button type="submit" onClick={()=>{dataForm.type='cnae'; }}>Consultar</button>
                                </div>
                            </form>
                        </div>
                    </div>                    

                    <div id='resultado-consulta'>

                        {loading ? <List /> : ''}

                        {!loading && response.type === 'error' ? 
                           <RespostaErro dados={response}/>
                        : ""}

                        {!loading && response.type === 'success' && respostaDadosNR.cnpj ? 
                            <RespostaGrCnpj dados={respostaDadosNR}/> : ""} 

                        {!loading && response.type === 'success' && !respostaDadosNR.cnpj ? 
                            <RespostaGrCnae dados={respostaDadosNR}/> : ""} 
                    </div>
                </div>
            </section>
          
        </div>
    )
}
export default ConsultaGR;