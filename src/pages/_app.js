import 'styles/style.css';
//import 'styles/respostaConsulta.css';
import 'styles/footer.css'
import Layout from 'components/layout/Layout';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
    return (
        <>


            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}