import 'styles/style.css';
import 'styles/respostaConsulta.css';
import 'styles/footer.css'
import Layout from 'components/layout/Layout';

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}