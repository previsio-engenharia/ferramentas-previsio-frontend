const RespostaSesmtCnae = ({dados}) => {
    
    const OBSSESMT1 = '(*) Tempo parcial (mínimo de três horas)';
    const OBSSESMT2 = '(**) O dimensionamento total deverá ser feito levando-se em consideração o dimensionamento da faixa de 3.501 a 5.000, acrescido do dimensionamento do(s) grupo(s) de 4.000 ou fração acima de 2.000.';
    const OBSSESMT3 = '(***) O empregador pode optar pela contratação de um enfermeiro do trabalho em tempo parcial, em substituição ao auxiliar ou técnico de enfermagem do trabalho';

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
            <h3 className='titulo2'>EQUIPE SESMT NECESSÁRIA</h3>
            <table>
                <tbody>
                    <tr>
                        <th className="header-v">Técnicos de Segurança</th>
                        <td>{dados.nro_tecnico_seg}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Engenheiros de Segurança</th>
                        <td>{dados.nro_engenheiro_seg}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Auxiliares/Técnicos de Enfermagem</th>
                        <td>{dados.nro_aux_tec_enfermagem}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Enfermeiros</th>
                        <td>{dados.nro_enfermeiro}</td>
                    </tr>
                    <tr>
                        <th className="header-v">Médicos</th>
                        <td>{dados.nro_medico}</td>
                    </tr>
                </tbody>
                <tfoot>
                    {dados.obsSesmt1 ? 
                    <tr>
                        <td colspan="2">
                            {dados.obsSesmt1 ? <p className="obs">{OBSSESMT1}</p> : ""}
                        </td>
                    </tr>
                    : ""}
                    {dados.obsSesmt2 ? 
                    <tr>
                        <td colspan="2">
                            {/*respostaDadosNR.obsSesmt2 ? <p>{OBSSESMT2}</p> : ""*/}
                        </td>
                    </tr>
                    : ""}
                    {dados.obsSesmt3 ? 
                    <tr>
                        <td colspan="2">
                            {dados.obsSesmt3 ? <p className="obs">{OBSSESMT3}</p> : ""}
                        </td>
                    </tr>
                    : ""}
                </tfoot>
            </table>
        </div>
    )
};

export default RespostaSesmtCnae;