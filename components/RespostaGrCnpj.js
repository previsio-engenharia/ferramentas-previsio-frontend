const RespostaGrCnpj = ({dados}) => {
    
    return(
        <div className='resposta-success'>
            <h3 className='titulo1'>CARACTERÍSTICAS DA EMPRESA</h3>
            <table>
                <tbody>
                    <tr>
                        <th className="header-v">CNPJ</th>
                        <td>{dados.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Razão Social</th>
                        <td>{dados.razaoSocial}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Nome Fantasia</th>
                        <td>{dados.nomeFantasia}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Porte da Empresa</th>
                        <td>{dados.porte}</td>
                    </tr>
                    <tr>
                        <th className="header-v">CNAE Principal</th>
                        <td>{dados.cod_cnae}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Denominação</th>
                        <td>{dados.desc_cnae}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Grau de Risco da Empresa</th>
                        <td>{dados.grau_risco}</td>
                    </tr>
                </tbody>
            </table>                
            
            <div>  
                {dados.dispensaPGR ?
                <div className="avisoDispensaPGR">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <p>
                        Com as características encontradas, a empresa consultada <strong>dispensa a elaboração de PGR</strong>. Também está dispensada da elaboração de PCMSO, desde que <strong>não</strong> sejam identificados riscos físicos, químicos, biológicos ou relacionados a fatores ergonômicos.
                    </p>
                    <p>Para a comprovação desta dispensa, é necessária a elaboração da <strong>Declaração de Inexistência de Riscos</strong>.</p>
                </div>
                : ""} 
            </div>                
        </div>
    )
};

export default RespostaGrCnpj;