import { Grid, Paper, Typography } from "@mui/material"
import TabelaDadosEmpresa from "./dados-empresa"
import TabelaDadosCnaes from "./dados-cnaes"
import TabelaDadosDispensaPgr from "./dados-dispensa-pgr"
import { theme } from "styles/themes"
import TabelaDadosSesmt from "./dados-sesmt"
import TabelaDadosCipa from "./dados-cipa"

export default function CardResponse({ statusResponse, dados }) {

    return (
        <Paper
            variant="outlined"
        //elevation={2}
        >
            {
                statusResponse.status == 'error' ? (
                    <Grid container
                        spacing={2}
                        p={2}
                    >
                        <Grid item xs={12} >
                            <Typography
                                variant="h6"
                                component="h3"
                                align="center"
                                sx={{
                                    backgroundColor: theme.palette.error.main,
                                    color: 'white',
                                }}
                            >
                                Erro
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                align="center"
                            >
                                {statusResponse.message}
                            </Typography>
                        </Grid>
                    </Grid>
                ) : statusResponse.status == 'success' ? (
                    <>
                        {   /** DADOS DA EMPRESA (consultas com CNPJ) */
                            dados.dadosDaEmpresa &&
                            <TabelaDadosEmpresa
                                dadosDaEmpresa={dados.dadosDaEmpresa}
                                cnaePrincipal={dados.dadosCnaes[0]}
                                grauDeRisco={dados.dadosDaEmpresa.maiorGrauDeRisco}
                            />
                        }
                        {   /** AVISO DISPENSA PGR (somente com consultas com CNPJ) */
                            dados.dadosDaEmpresa && dados.dadosDaEmpresa.dispensaPGR &&
                            <TabelaDadosDispensaPgr />
                        }
                        {   /** DADOS DA EQUIPE SESMT (consultas nr04) */
                            dados.consultaSesmt &&
                            <TabelaDadosSesmt dadosSesmt={dados.consultaSesmt} />
                        }
                        {   /** DADOS DA EQUIPE CIPA (consultas nr05) */
                            dados.consultaCipa &&
                            <TabelaDadosCipa dadosCipa={dados.consultaCipa} />
                        }
                        {   /** todas consultas */
                            dados.dadosCnaes ? (
                                <TabelaDadosCnaes dadosCnaes={dados.dadosCnaes} startOpen={!dados.dadosDaEmpresa} />
                            ) : (null)
                        }
                    </>
                ) : (<h3>erro</h3>)
            }
        </Paper >
    )
};