import { Button, Card, CardActions, CardContent, Divider, Grid, Paper, Typography } from "@mui/material"
import ExternalLinkButton from "./external-link-button"

export default function CardExplicaConsulta({ title, text, link }) {

    //console.log("GR", dados.dadosCnaes)
    //const { loading, status, message } = statusR
    //const { dadosDaEmpresa, dadosCnaes, consultaSesmt, consultaCipa } = dados

    return (
        <Card elevation={2} sx={{ px: 1}}>
            <CardContent>
                <Typography
                    variant='h6'
                    component='h2'
                    align="center"
                    sx={{ mb: 2 }}
                >
                    {title}
                </Typography>
                <Typography
                    paragraph
                    align='justify'
                    //sx={{ mt: 2 }}
                >
                    {text}
                </Typography>
            </CardContent>
            <CardActions>
                <ExternalLinkButton link={link} text ={'Acesse a norma completa'} />
            </CardActions>
        </Card>
    )
};