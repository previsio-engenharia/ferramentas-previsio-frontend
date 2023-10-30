
export async function gerarRelatorio(dataForm, respostaApi) {

    //se deu certo até aqui, realiza o POST 
    try {
        //const res = await fetch('http://localhost:5000/api/report', {
        const res = await fetch('https://ferramentas-previsio-backend-git-migracaotabelasjson-previsio.vercel.app/api/report', {

            method: 'POST',
            body: JSON.stringify({
                form: dataForm, 
                response: respostaApi
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        return await res.json();

    } catch (err) {
        console.log(err);
        return null
    }
}