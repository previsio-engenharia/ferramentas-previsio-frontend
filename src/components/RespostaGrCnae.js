const RespostaGrCnae = ({ dados }) => {

    //console.log("GR", dados.dadosCnaes)
    //const { dadosCnaes, dadosDaEmpresa } = dados

    return (
        <div className='resposta-success'>
            <h3 className='titulo1'>CARACTERÍSTICAS DA EMPRESA</h3>
            {
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
                                <td colSpan="100%" style={{ backgroundColor: "#44B44A", padding: "1px" }}></td>
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
                        </tbody>
                        : ""}
                </table>
            }
        </div>
    )
};

export default RespostaGrCnae;