import { Grid, Paper, Typography } from "@mui/material"
import TabelaDadosEmpresa from "./dados-empresa"
import TabelaDadosCnaes from "./dados-cnaes"

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
                        sx={{
                            //backgroundColor:'grey'
                        }}
                    >
                        <Grid item xs={12} >
                            <Typography
                                variant="h6"
                                component="h3"
                                align="center"
                                sx={{
                                    backgroundColor: 'red',
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
                        {
                            dados.dadosDaEmpresa ? (
                                <TabelaDadosEmpresa 
                                    dadosDaEmpresa={dados.dadosDaEmpresa}
                                    cnaePrincipal={dados.dadosCnaes[0]}
                                    grauDeRisco={dados.dadosDaEmpresa.maiorGrauDeRisco} 
                                />
                            ) : (null)
                        }
                        {
                            dados.consultaSesmt ? (
                                <p>dados Sesmt</p>
                            ) : (null)
                        }
                        {
                            dados.consultaCipa ? (
                                <p>dados Cipa</p>
                            ) : (null)
                        }
                        {
                            dados.dadosCnaes ? (
                                <TabelaDadosCnaes dadosCnaes={dados.dadosCnaes} startOpen={!dados.dadosDaEmpresa}/>
                            ) : (null)
                        }
                    </>
                ) : (
                    <h3>erro bizarro</h3>
                )
            }
        </Paper >
    )
};