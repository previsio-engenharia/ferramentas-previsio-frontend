import { Grid, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import logoPrevisio from 'public/previsio_logo_2.svg'

function NotFound404(){
    return(
        <>
            <Head>
                <meta name="description" content="Previsio Engenharia: Página não encontrada"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>Página não encontrada - Previsio Engenharia</title>
            </Head>
            <Stack 
                spacing={2} 
                justifyContent="center"
                alignItems="center"
                sx={{mt:5, mb: 20}}>
                <Image 
                    src={logoPrevisio} 
                    alt='logo da empresa'
                    sizes="100vw"
                    style={{
                        
                        width: '25%',
                        height: 'auto',
                    }}
                    
                    priority                    
                />
                <Typography variant='h5' textAlign={'center'}>404: Página Não Encontrada</Typography>
            </Stack>
            
        </>
    )
}
export default NotFound404