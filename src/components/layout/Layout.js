import Head from "next/head"
import Footer from "components/Footer"
import Menu from "components/Menu"
import { Container, CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "styles/themes"

export default function Layout({ children }) {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Menu />
            <Container maxWidth="lg" sx={{ marginTop: 16, minHeight: '60vh' }}>
                <main className="mainContainer">
                    {children}
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}