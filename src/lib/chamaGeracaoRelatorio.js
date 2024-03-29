const API_RELATORIO = 'https://ferramentas-previsio-backend.vercel.app/api/report';
//const API_RELATORIO = 'http://localhost:5000/api/report'


export async function gerarRelatorio(dataForm, respostaApi) {

    //se deu certo até aqui, realiza o POST 
    try {
        const res = await fetch(API_RELATORIO, {
            method: 'POST',
            body: JSON.stringify({
                form: dataForm, 
                response: respostaApi
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //console.log("RESPOSTA API", res.json())
        return await res.json();

    } catch (err) {
        console.log(err);
        return null
    }
}