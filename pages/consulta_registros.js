import { useState } from 'react';

function Registros(){
    var [dataForm, setDataForm] = useState({
        login: '',
        senha: ''
    });
    
    const onChangeInput = e => setDataForm({...dataForm, [e.target.name]: e.target.value});

    const requestRegistros = async e => {
        
        e.preventDefault();
        
        if(dataForm.login == ''){
            alert('Erro: Insira o login.');
        }
        else if(dataForm.senha == ''){
            alert('Erro: Insira a senha.');
        }
        else{
            try{
                const res = await fetch(process.env.SERVER_URL + 'registros', {
                    method: 'POST',
                    body: JSON.stringify(dataForm),
                    headers: { 'Content-Type': 'application/json' }
                }).then()
                .then(async (res)=>{
                    let resposta = await res.text();
                    if(res.status == 400 || res.status == 401){
                        alert(resposta)
                    } else if(res.status == 200){
                        let blob = new Blob([res], { type: 'text/csv' });
                        //const downloadLink = downloadBlob(blob, 'consultasNR04eNR05.csv');
            
                        const filename = 'consultasNR04eNR05.csv';
                        // Create an object URL for the blob object
                        const url = URL.createObjectURL(blob);
                        
                        // Create a new anchor element
                        const a = document.createElement('a');
                        
                        // Set the href and download attributes for the anchor element
                        // You can optionally set other attributes like `title`, etc
                        // Especially, if the anchor element will be attached to the DOM
                        a.href = url;
                        a.download = filename || 'download';
                        
                        // Click handler that releases the object URL after the element has been clicked
                        // This is required for one-off downloads of the blob content
                        const clickHandler = () => {
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                            //this.removeEventListener('click', clickHandler);
                        }, 150);
                        };
                        
                        // Add the click event listener on the anchor element
                        // Comment out this line if you don't want a one-off download of the blob content
                        a.addEventListener('click', clickHandler, false);
                        
                        // Programmatically trigger a click on the anchor element
                        // Useful if you want the download to happen automatically
                        // Without attaching the anchor element to the DOM
                        // Comment out this line if you don't want an automatic download of the blob content
                        a.click();
                        
                        // Return the anchor element
                        // Useful if you want a reference to the element
                        // in order to attach it to the DOM or use it in some other way
                        //return a;
            
                        /*
                        // Set the title and classnames of the link
                        downloadLink.title = 'Export Records as CSV';
                        downloadLink.classList.add('btn-link', 'download-link');
                        downloadLink.style = 'color: black; background-color: green; padding: 20px; ';
                        //downloadLink.style('black');
            
                        // Set the text content of the download link
                        downloadLink.textContent = 'Baixe o registro de consultas em .csv';
            
                        // Attach the link to the DOM
                        document.body.appendChild(downloadLink);
                        */  
                        setDataForm({ 
                            login: '',
                            senha: ''
                        })
                    return;      
                    } 
                });
                
            } catch(err){
                throw err;
            }
        }
      }


    return(
        <div style={{'padding': '30px', 'width': '400px', 'height': '300px', 'margin': 'auto'}}>
            <div style={{'margin': 'auto', 'textAlign':'center'}}>            
                <form onSubmit={requestRegistros} style={{'textAlign':'center'}}>
                    <h1 style={{'padding':'20px'}}>Consulta de Registros</h1>
                    <label for="login"/>Login:<br/>
                    <input type="text" name="login" onChange={onChangeInput} value={dataForm.login} style={{'textAlign':'center', 'width': '200px', 'height': '30px'}}/><br/>
                    <label for="login"/>Senha:<br/>
                    <input type="password" name="senha" onChange={onChangeInput} value={dataForm.senha} style={{'textAlign':'center', 'width': '200px', 'height': '30px'}}/><br/>
                    <input type="submit" value="Baixar" style={{'width': '200px', 'height': '50px', 'margin-top': '20px' }}/>
                </form>
            </div>
        </div>
    )
}

export default Registros;