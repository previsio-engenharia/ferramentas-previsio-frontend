const RespostaCipaCnae = ({dados}) => {

    return(
        <div className='resposta-success'>
            <h3 className='titulo1'>CARACTERÍSTICAS DA EMPRESA</h3>
            <table>
                {dados.cod_cnae[0] ? 
                <tbody>
                    <tr>
                        <th className="header-v">CNAE Consultado</th>
                        <td>{dados.cod_cnae[0]}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Denominação do CNAE</th>
                        <td>{dados.desc_cnae[0]}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Grau de Risco Associado</th>
                        <td>{dados.grau_risco[0]}</td>
                    </tr>
                </tbody>
                : ""}
                {dados.cod_cnae[1] ? 
                <tbody>
                    <tr>
                        <td colspan="100%" style={{backgroundColor: "#44B44A", padding: "1px"}}></td>
                    </tr>
                    <tr>
                        <th className="header-v">CNAE Consultado</th>
                        <td>{dados.cod_cnae[1]}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Denominação do CNAE</th>
                        <td>{dados.desc_cnae[1]}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Grau de Risco Associado</th>
                        <td>{dados.grau_risco[1]}</td>
                    </tr> 
                    <tr>
                        <td colspan="100%" style={{backgroundColor: "#44B44A", padding: "1px"}}></td>
                    </tr>

                    <tr>
                        <th className="header-v" style={{backgroundColor: "white", paddingTop: "0px"}}>Quantidade de Trabalhadores</th>
                        <td  style={{backgroundColor: "white", paddingTop: "0px"}}>{dados.nro_trabalhadores}</td>
                    </tr>
                </tbody>
                :   
                    <tr>
                        <th className="header-v" style={{backgroundColor: "#eaf8f2", paddingTop: "15px"}}>Quantidade de Trabalhadores</th>
                        <td  style={{backgroundColor: "#eaf8f2", paddingTop: "10px"}}>{dados.nro_trabalhadores}</td>
                    </tr>
                }
            </table>                
            <h3 className='titulo2'>EQUIPE CIPA NECESSÁRIA</h3>
            <table>
                <tbody>
                    <tr>
                        <th className="header-v"></th>
                        <th className="header-h">Representantes da organização</th>
                        <th className="header-h">Representantes dos empregados</th>                        
                    </tr>
                    <tr>
                        <th className="header-v">Membros da equipe efetiva</th>
                        <td>{dados.cipa_efetivos}</td>
                        <td>{dados.cipa_efetivos}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Membros da equipe suplente</th>
                        <td>{dados.cipa_suplentes}</td>
                        <td>{dados.cipa_suplentes}</td>
                    </tr> 
                </tbody>
                <tfoot>                    
                    <tr>
                        <td colspan="3">
                        Os representantes da organização na CIPA, titulares e suplentes, serão por ela designados.
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                        Os representantes dos empregados, titulares e suplentes, serão eleitos em escrutínio secreto, do qual participem, independentemente de filiação sindical, exclusivamente os empregados interessados.
                        </td>
                    </tr>
                </tfoot>
            </table>               
        </div>
    )
};

export default RespostaCipaCnae;