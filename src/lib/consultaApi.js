const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
const cnaeRegex = /^\d{1,2}\.\d{1,2}-\d{1}/
const emailRegex = /\S+@\S+\.\S+/

export async function validateAndSendForm(dataForm) {

    //verifica inicialmente se o CNPJ foi inserido corretamente
    if (dataForm.type == 'cnpj') {
        //a mascara impede a inclusão de caracteres que não são numeros ou delimitadores
        //necessário checar se o tamanho está correto. Checado com o regex
        if (!dataForm.cnpj.match(cnpjRegex)) {
            alert('Erro: Insira o CNPJ no formato correto');
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
            return null
        }
        //deleta os dados do cnpj para enviar apenas os cnaes
        //faz isso para evitar problema na API
        delete dataForm.cnpj;
    }
    else {
        //dá falha se não reconhecer nem cnpj nem cnae
        alert('Erro: Falha no envio do formulário');
        return null
    }

    //verifica se o nro de trabalhadores foi preenchido corretamente (para nr04 e nr05)
    if (dataForm.consulta == 'nr04' || dataForm.consulta == 'nr04') {
        const nro = parseInt(dataForm.numero_trabalhadores)
        if (!nro || nro < 0) {
            alert('Erro: Insira o número de trabalhadores corretamente');
            return null
        }
    }


    if (dataForm.receberEmail) {
        if (!dataForm.userEmail.match(emailRegex)) {
            alert('Erro: Insira um e-mail válido.');
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

        return await res.json();

    } catch (err) {
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

export async function saveQueryOnDB(dataForm, apiResponse) {
    const data = {
        tipo: apiResponse.tipo_consulta,
        status: apiResponse.status_consulta,
        cnpj: dataForm.cnpj || null,
        cnae1: dataForm.codigo_cnae1 || null,
        cnae2: dataForm.codigo_cnae2 || null,
        nro_trabalhadores: dataForm.numero_trabalhadores || null,
        email: dataForm.userEmail || null
    }

            
    //
    console.log("DATAFORM:", dataForm);
    console.log("RESPONSE:", apiResponse);

    //se deu certo até aqui, realiza o POST
    try {
        const res = await fetch('/api/salva-consultas-db', {
            method: 'POST',
            body: JSON.stringify({ data }),
            headers: { 'Content-Type': 'application/json' }
        });

        return await res.json();

    } catch (err) {
        console.log(err);
        return null
    }
}