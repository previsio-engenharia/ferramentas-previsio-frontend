
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
const cnaeRegex = /^\d{1,2}\.\d{1,2}-\d{1}/;
const emailRegex = /\S+@\S+\.\S+/

export async function validateAndSendForm(dataForm) {

    //inicia placeholder
    //setLoading(true);

    //indica que não deve recarregar a página
    //e.preventDefault();

    //verifica inicialmente se o CNPJ foi inserido corretamente
    if (dataForm.type == 'cnpj') {
        //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
        //necessário checar se o tamanho está correto. Checado com o regex
        if (!dataForm.cnpj.match(cnpjRegex)) {
            alert('Erro: Insira o CNPJ no formato correto');
            //setLoading(false);
            return null
        }
        //deleta os dados cnae para enviar apenas o cnpj
        delete dataForm.codigo_cnae1;
        delete dataForm.codigo_cnae2;

    } else if (dataForm.type == 'cnae') {
        //verifica se o cnae foi inserido corretamente
        //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
        //necessário checar se o tamanho está correto. Checado com o regex
        if (!dataForm.codigo_cnae1.match(cnaeRegex) && !dataForm.codigo_cnae2.match(cnaeRegex)) {
            alert('Erro: Insira um código CNAE válido');
            //setLoading(false)
            return null
        }
        //deleta os dados do cnpj para enviar apenas os cnaes
        //faz isso para evitar problema na API
        delete dataForm.cnpj;
    }
    else {
        //dá falha se não reconhecer nem cnpj nem cnae
        alert('Erro: Falha no envio do formulário');
        //setLoading(false);
        //setLoading(false);
        return null
    }

    //verifica se o nro de trabalhadores foi preenchido corretamente (para nr04 e nr05)
    if (dataForm.consulta == 'nr04' || dataForm.consulta == 'nr04' ){
        const nro = parseInt(dataForm.numero_trabalhadores)
        //console.log("ABC:", nro)
        if(nro < 0){
            alert('Erro: Insira o número de trabalhadores corretamente');
            return null
        }
    }


    if (dataForm.receberEmail) {
        if (!dataForm.userEmail.match(emailRegex)) {
            alert('Erro: Insira um e-mail válido.');
            //setLoading(false);
            return
        }
    }

    //se deu certo até aqui, realiza o POST
    try {
        const res = await fetch('/api/realiza-consultas', {
            method: 'POST',
            body: JSON.stringify(dataForm),
            headers: { 'Content-Type': 'application/json' }
        });

        //const respostaConsultaTabelas = await res.json();
        return await res.json();
        //console.log("RESPOSTA:", respostaConsultaTabelas);

    } catch (err) {
        //setLoading(false);
        console.log(err);
        return null
    }
}

export const updateResponseState = (response, setStatus, setResponse) => {
    if (!response.success) {
        setStatus((previousState) => ({
            ...previousState,
            status: 'error',
            message: response.mensagem
        }))
    }
    else {
        setResponse(response)

        setStatus({
            loading: false,
            status: 'success',
            message: response.mensagem
        })
    }
}