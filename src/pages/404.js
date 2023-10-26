import { Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';

function NotFound404() {
    return (
        <>
            <Head>
                <meta name="description" content="Previsio Engenharia: Página não encontrada" />
                <title>Página não encontrada - Previsio Engenharia</title>
            </Head>
            <Stack
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 16, mb: 20 }}>
                <Image
                    src='/previsio_logo_vd.svg'
                    alt="Logo Previsio Engenharia"
                    sizes="100vw"
                    width={30}
                    height={30}
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