import Head from "next/head"
import Footer from "components/Footer"
import Menu from "components/Menu"
import { Box, Container, CssBaseline } from "@mui/material"

/**
 * <Head>
                <meta name="description" content="Previsio Engenharia: Ferramentas para Saúde e Segurança do Trabalho"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Ferramentas - Previsio Engenharia</title>
            </Head>
 */

export default function Layout({ children }) {

    return (
        <>
            <CssBaseline/>
            <Head>
                <link rel="shortcut icon" href="/public/favicon.ico" />
            </Head>
            <Menu />
            <Box>
                <Container maxWidth="lg" sx={{  marginTop: 16 }}>
                    <main className="mainContainer">
                        {children}
                    </main>
                </Container>
            </Box>
            <Footer />

        </>
    )
}