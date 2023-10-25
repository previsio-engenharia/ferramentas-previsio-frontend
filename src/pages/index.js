//mui
import { Grid, Typography } from '@mui/material';
import { ListaLinksFerramentas } from 'components/lista-links-ferramentas';

import Head from 'next/head';

export default function Home() {

    return (
        <>
            <Head>
                <title>Ferramentas - Previsio Engenharia</title>
                <meta name="description" content="Previsio Engenharia: Ferramentas de Consultas" />
            </Head>
            <Grid container >
                {/*titulo da pagina e aviso*/}
                <Grid item xs={12}>
                    <Typography
                        color='primary'
                        variant='h2'
                        component='h1'
                        textAlign='center'
                        sx={{
                            mb: 2,
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        Ferramentas
                    </Typography>
                </Grid>
                {/*aviso de testes*/}

                {/*texto grau de risco*/}
                <Grid item xs={12} sm={12} md={6}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        //display: { xs: 'none', md: 'block' },
                        px: 2
                    }}
                >
                    <Typography
                        variant='h6'
                        component='h2'
                        textAlign='center'
                        sx={{ p: 2 }}
                    >
                        Normas Regulamentadoras (NRs)
                    </Typography>

                    <ListaLinksFerramentas />

                </Grid>
                {/*formulario de consulta*/}
                <Grid item xs={12} sm={12} md={6}
                    sx={{ px: 2 }}
                >
                    <Typography
                        variant='h6'
                        component='h2'
                        textAlign='center'
                        sx={{ p: 2 }}
                    >
                        Ferramentas de Consulta
                    </Typography>
                    <Typography
                        paragraph
                        align='justify'
                        sx={{ pt: 2, px: 2 }}
                    >
                        Oferecemos ferramentas práticas para consultar informações relacionadas a normas regulamentadoras brasileiras.  Simplificamos a busca por dados normativos, ajudando você a conhecer melhor as regulamentações de segurança no trabalho. Comece sua pesquisa agora e descubra o que as normas têm a dizer.
                    </Typography>

                </Grid>
            </Grid>
        </>

    )
}