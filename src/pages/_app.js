import 'styles/style.css';
import 'styles/footer.css'
import Layout from 'components/layout/layout';

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}