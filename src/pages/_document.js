import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang='pt-br'>
        <Head>
          <meta name="keywords" content="Segurança do trabalho, NR" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Joel De Conto" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600&display=swap" rel="stylesheet" />
        </Head>

        <body>

          <Main />
        </body>
        <NextScript />
      </Html>
    )
  }
}
