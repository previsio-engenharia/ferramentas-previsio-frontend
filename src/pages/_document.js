import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render () {
    return (
      <Html lang='pt-br'>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="keywords" content="Segurança do trabalho, NR"></meta>
          <meta name="robots" content="index, follow"/>
          <meta name="author" content="Joel De Conto"/>            
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>
        </Head>     
  
        <body>
        
          <Main />
        </body>        
        <NextScript />
      </Html>
    )
  }
}