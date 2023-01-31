import Head from 'next/head';
import Image from 'next/image';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import logoPrevisio from '../public/previsio_logo_2.svg'

function NotFound404(){
    return(
        <div >
            <Head>
                <meta name="description" content="Previsio Engenharia: Página não encontrada"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Página não encontrada - Previsio Engenharia</title>
            </Head>
            <div >
                <Menu/>
                <section style={{height:"50vh", paddingTop:"20vh"}}>
                    <div style={{width: '100%', height: '100%', position: 'relative'}}>
                    <Image 
                        src={logoPrevisio} alt='logo da empresa'
                        layout='fill'
                        objectFit='contain'                       
                        priority
                    />                    
                    </div>
                    <h3 style={{textAlign:"center", fontFamily:"Roboto", fontWeight:"400", margin:"auto", paddingTop:"15px"}}>404: Página Não Encontrada</h3>
                </section>
                <Footer/>
            </div>
        </div>
    )
}
export default NotFound404