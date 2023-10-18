import { Divider, Grid, Paper, Typography } from "@mui/material"

export default function RespostaGrSucesso({ dados }) {

    //console.log("GR", dados.dadosCnaes)
    const { dadosCnaes, dadosDaEmpresa } = dados

    return (
        <Paper elevation={2}>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <Typography variant="h3" component="h2">CARACTERÍSTICAS DA EMPRESA</Typography>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                    {
                        dadosCnaes.map(cnae => (
                            <>
                                <Grid item xs={4}>
                                    CNAE Consultado
                                </Grid>
                                <Grid item xs={8}>
                                    {cnae.codigo}
                                </Grid>
                                <Grid item xs={4}>
                                    Denominação do CNAE
                                </Grid>
                                <Grid item xs={8}>
                                    {cnae.denominacao}
                                </Grid>
                                <Grid item xs={4}>
                                    Grau de Risco Associado
                                </Grid>
                                <Grid item xs={8}>
                                    {cnae.grauDeRisco}
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                                
                            </>
                        ))
                    }

                </Grid>
            </Grid>

        </Paper>

    )
};