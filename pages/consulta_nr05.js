import { useState } from 'react';
import Head from 'next/head';
import InputMask from 'react-input-mask';
import ContentLoader, {List} from 'react-content-loader';

import Menu from '../components/Menu';
import AvisoTestes from '../components/AvisoTestes'
import RespostaErro from '../components/RespostaErro'
import RespostaCipaCnpj from '../components/RespostaCipaCnpj'
import RespostaCipaCnae from '../components/RespostaCipaCnae'
import Footer from '../components/Footer';

function ConsultaNR05(){

    const [dataForm, setDataForm] = useState({
        consulta: 'nr05',
        cnpj: '',
        codigo_cnae1: '',
        codigo_cnae2: '',
        numero_trabalhadores: '',
        type: '',
        userEmail: ''
    });
    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState({
        type: '',
        mensagem: ''
    });

    var [respostaDadosNR, setRespostaDadosNR] = useState({
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        cod_cnae: '',
        desc_cnae: '',
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
        dispensaPGR: '',
        porte: ''
    });

    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});

    const sendInfo = async e => {
        //inicia placeholder
        setLoading(true);

        //indica que não deve recarregar a página
        e.preventDefault();

        //verifica numero de funcionários
        if(dataForm.numero_trabalhadores == 0 || dataForm.numero_trabalhadores == ""){
            //nroFuncOk = true;
            alert('Erro: Insira o número de funcionários.');
            setLoading(false);
            return
        }

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

        //se deu certo até aqui, realiza o POST
        try{
            const res = await fetch(process.env.SERVER_URL + 'nr04-05-consulta', {
                method: 'POST',
                body: JSON.stringify(dataForm),
                headers: { 'Content-Type': 'application/json' }
            });
            //console.log(dataForm);
            
            const retorno = await res.json();
            console.log(retorno.respostaConsultaTabelas);
            //console.log(responseEnv.sesmt_table[0]);
            
            if(retorno.respostaConsultaTabelas.erro){
                setResponse({
                    type:'error',
                    mensagem: retorno.respostaConsultaTabelas.mensagem                        
                });
            }
            else{
                if(dataForm.type=='cnpj'){
                    setRespostaDadosNR({ 
                        cod_cnae: retorno.respostaConsultaTabelas.codigoCnaeFiscal,
                        desc_cnae: retorno.respostaConsultaTabelas.descricaoCnaeFiscal,                   
                        cnpj: retorno.respostaConsultaTabelas.cnpj,
                        razaoSocial: retorno.respostaConsultaTabelas.razaoSocial,
                        nomeFantasia: retorno.respostaConsultaTabelas.nomeFantasia,
                        grau_risco: retorno.respostaConsultaTabelas.maiorGrauRisco,
                        nro_trabalhadores: retorno.respostaConsultaTabelas.nroTrabalhadores,
                        faixa_nro_trabalhadores_sesmt: 'entre ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMinSesmt + ' e ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMaxSesmt,
                        nro_tecnico_seg: retorno.respostaConsultaTabelas.tecnicoSeg,
                        nro_engenheiro_seg: retorno.respostaConsultaTabelas.engenheiroSeg,
                        nro_aux_tec_enfermagem: retorno.respostaConsultaTabelas.auxTecEnfermagem,
                        nro_enfermeiro: retorno.respostaConsultaTabelas.enfermeiro,
                        nro_medico: retorno.respostaConsultaTabelas.medico,
                        faixa_nro_trabalhadores_cipa: 'entre ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMinCipa + ' e ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMaxCipa,
                        cipa_efetivos: retorno.respostaConsultaTabelas.cipaEfetivos,
                        cipa_suplentes: retorno.respostaConsultaTabelas.cipaSuplentes,
                        dispensaPGR: retorno.respostaConsultaTabelas.dispensaPGR,
                        porte: retorno.respostaConsultaTabelas.porte
                    });
                }else 
                if(dataForm.type=='cnae'){
                    setRespostaDadosNR({
                        cod_cnae: retorno.respostaConsultaTabelas.codigoCnae[0],
                        desc_cnae: retorno.respostaConsultaTabelas.descricaoCnae[0],
                        cnpj: retorno.respostaConsultaTabelas.cnpj,
                        razaoSocial: retorno.respostaConsultaTabelas.razaoSocial,
                        nomeFantasia: retorno.respostaConsultaTabelas.nomeFantasia,                        
                        grau_risco: retorno.respostaConsultaTabelas.maiorGrauRisco,
                        nro_trabalhadores: retorno.respostaConsultaTabelas.nroTrabalhadores,
                        faixa_nro_trabalhadores_sesmt: 'entre ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMinSesmt + ' e ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMaxSesmt,
                        nro_tecnico_seg: retorno.respostaConsultaTabelas.tecnicoSeg,
                        nro_engenheiro_seg: retorno.respostaConsultaTabelas.engenheiroSeg,
                        nro_aux_tec_enfermagem: retorno.respostaConsultaTabelas.auxTecEnfermagem,
                        nro_enfermeiro: retorno.respostaConsultaTabelas.enfermeiro,
                        nro_medico: retorno.respostaConsultaTabelas.medico,
                        faixa_nro_trabalhadores_cipa: 'entre ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMinCipa + ' e ' + retorno.respostaConsultaTabelas.nroTrabalhadoresMaxCipa,
                        cipa_efetivos: retorno.respostaConsultaTabelas.cipaEfetivos,
                        cipa_suplentes: retorno.respostaConsultaTabelas.cipaSuplentes
                    });
                }
                setResponse({
                    type:'success',
                });
                setDataForm({
                    consulta: 'nr05',
                    cnpj: '',
                    codigo_cnae1: '',
                    codigo_cnae2: '',
                    numero_trabalhadores: '',
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
        document.getElementById("resultado-consulta").scrollIntoView({behavior: 'smooth'})
    }

    return(
        <div>
            <Head>
                <meta name="description" content="Previsio Engenharia: Consulta NR-05: Constituição de Equipe CIPA"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Consulta NR05 - Previsio Engenharia</title>
            </Head>

            <Menu/>
            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Consulta NR05: Equipe CIPA</h2>
                    <AvisoTestes/>
                    <div className='contact-content'>
                        
                        <div className='column left'>
                            <div className='bloco-explicacao'>
                                <h3 className='titulo-consulta'>NR05</h3>
                                <p>Esta Norma estabelece os parâmetros e os requisitos da Comissão Interna de Prevenção de Acidentes – CIPA, tendo por objetivo a prevenção de acidentes e doenças relacionadas ao trabalho, de modo a tornar compatível, permanentemente, o trabalho com a preservação da vida e promoção da saúde do trabalhador.</p>
                                <a target="_blank" href="https://www.gov.br/trabalho-e-previdencia/pt-br/composicao/orgaos-especificos/secretaria-de-trabalho/inspecao/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-05-atualizada-2021-1.pdf"><i className="fa-sharp fa-solid fa-arrow-right"></i> Acesse a norma completa</a>
                            </div>
                        </div>

                        <div className='column right'>
                            <div className='titulo-consulta'>
                                Composição da Equipe da CIPA                                
                            </div>
                            <p>Com esta ferramenta, é possível descobrir rapidamente a composição necessária da equipe da CIPA, conforme orientado pelas normas vigentes. Indique o CNPJ e o número de funcionários da empresa que deseja consultar. Caso não seja possível consultar o CNPJ, há a opção de consultar diretamente com o CNAE desejado.</p>
                            <div>
                                <button className='selecionaEntrada btnCNPJ' >Consultar com CNPJ</button>
                                <button className='selecionaEntrada btnCNAE' >Consultar com CNAE</button>
                                
                            </div>
                            
                            <form className='formCNPJ' onSubmit={sendInfo}>
                                <div className='fields'>
                                    <div className='field'>
                                    <InputMask type="text" name="cnpj" mask="99.999.999/9999-99" placeholder="Digite o CNPJ da empresa" onChange={onChangeInput} value={dataForm.cnpj}/>
                                    </div>
                                </div>
                                <div className='fields'>
                                    <div className='field email'>
                                        <input type="number" name="numero_trabalhadores" placeholder="Digite o número de funcionários" min="1" step="1" onChange={onChangeInput} value={dataForm.numero_trabalhadores}/>
                                    </div>
                                </div>
                                <div className='label'>
                                    <p>Deseja receber o relatório da consulta em formato PDF (opcional)?</p>
                                </div>
                                <div className='fields'>
                                    <div className='field'>
                                        <input className='inputEmail' type='text' name="userEmail" placeholder="Digite seu e-mail" min="1" step="1" onChange={onChangeInput} value={dataForm.userEmail}/>
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
                                <div className='fields'>
                                    <div className='field email'>
                                        <input type="number" name="numero_trabalhadores" placeholder="Digite o número de funcionários" onChange={onChangeInput} value={dataForm.numero_trabalhadores}/>
                                    </div>
                                </div>
                                <div className='label'>
                                    <p>Deseja receber o relatório da consulta em formato PDF (opcional)?</p>
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
                            <RespostaCipaCnpj dados={respostaDadosNR}/> : ""} 

                        {!loading && response.type === 'success' && !respostaDadosNR.cnpj ? 
                            <RespostaCipaCnae dados={respostaDadosNR}/> : ""} 
                    </div>

                </div>
            </section>

            <Footer/>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
            <script src="custom.js"></script>
         
        </div>
    )
}

export default ConsultaNR05;