import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
    render() {
        return (
            <Html lang='pt-br'>
                <Head>
                    <meta name="keywords" content="Segurança do trabalho, NR" />
                    <meta name="robots" content="index, follow" />
                    <meta name="author" content="Joel De Conto" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600&display=swap" rel="stylesheet" />
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9453424231422521"
                        crossOrigin="anonymous"></script>
                </Head>

                <body>

                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}
