//next
import Head from "next/head"
//mui
import { Container, CssBaseline, ThemeProvider } from "@mui/material"
//theme
import { theme } from "styles/themes"
import Menu from "./menu"
import Footer from "./footer"
//components

export default function Layout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Menu />
            <Container maxWidth="lg" sx={{ marginTop: 12, marginBottom: 4, minHeight: '80vh' }}>
                <main className="mainContainer">
                    {children}
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}