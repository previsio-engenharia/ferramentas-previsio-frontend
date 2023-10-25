//import { esconderAviso } from "lib/aviso";
'use client'

import { Box, Button, Card, CardActions, CardContent, Link, Paper, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'

import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { theme } from 'styles/themes';

const linkEmail = 'mailto:ped@previsio.com.br?subject=Feedback%20sobre%20ferramentas%20de%20consulta&body=Olá,%0D%0Aestive%20utilizando%20as%20ferramentas%20de%20consulta%20no%20site%20da%20Previsio%20e%20gostaria%20de%20deixar%20o%20seguinte%20comentário:%0D%0A%0D%0A'
const linkContato = 'https://previsio.com.br/contato/'

export default function CardAvisoTestes() {

    const [esconderAviso, setEsconderAviso] = useState(true)

    // Check if a cookie exists to hide the warning
    useEffect(() => {
        const cookieValue = Cookies.get('hideWarning');
        if (cookieValue) {
            setEsconderAviso(true)
        }
        else {
            setEsconderAviso(false)
        }
    }, []);

    function createCookie() {
        Cookies.set('hideWarning', 'true', {
            expires: 7, //7 dias
            path: '/'
        });
        setEsconderAviso(true);
    }

    return (
        <>
            {
                esconderAviso ? null : (
                    <Card
                        elevation={4}
                        sx={{
                            backgroundColor: '#f5f5f0',
                            px: {
                                xs: 1,
                                md: 4
                            },
                            py:{
                                xs: 1,
                                md: 1
                            },
                            mx:{
                                xs:1,
                                md: 2
                            },
                            my:{
                                xs: 1,
                                md: 4,
                            }
                        }}
                    >
                        <Box display="flex" justifyContent="center">
                            <CardContent>
                                <Typography
                                    variant='h3'
                                    component='h2'
                                    align="center"
                                    py={2}
                                >
                                    <WarningRoundedIcon
                                        color='secondary'
                                    /> AVISO
                                </Typography>
                                <Typography
                                    paragraph
                                    align='center'
                                //sx={{ mt: 2 }}
                                >
                                    Esta é uma página em desenvolvimento!
                                </Typography>
                                <Typography
                                    paragraph
                                    align='center'
                                //sx={{ mt: 2 }}
                                >
                                    As informações e funcionalidades da ferramenta podem sofrer alterações sem aviso prévio.
                                </Typography>
                                <Typography
                                    paragraph
                                    align='center'
                                //sx={{ mt: 2 }}
                                >
                                    Encorajamos que erros, informações incorretas, falhas de qualquer natureza, reclamações e sugestões sejam reportadas para o e-mail <Link href={linkEmail} color='secondary' underline="hover" fontWeight={500}>ped@previsio.com.br</Link> ou através do <Link target="_blank" href={linkContato} color='secondary' underline="hover" fontWeight={500}>formulário de contato</Link> no site da empresa.
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <CardActions >


                                <Button
                                    onClick={createCookie} color="secondary"
                                    variant='contained'

                                >
                                    Entendi!
                                </Button>

                            </CardActions>
                        </Box>
                    </Card >

                )
            }
        </>
    )
}