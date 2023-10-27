import Link from "next/link";
import { Box, Container, Grid, Typography, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { theme } from "styles/themes";

const navItems = [
    {
        text: 'Início',
        link: 'https://previsio.com.br',
    },
    {
        text: 'Soluções e Serviços',
        link: 'https://previsio.com.br/segurança-do-trabalho',
    },
    {
        text: 'Artigos',
        link: 'https://previsio.com.br/artigos',
    },
    {
        text: 'Downloads',
        link: 'https://previsio.com.br/downloads',
    },
    {
        text: 'Ferramentas',
        link: '/',
    },
    {
        text: 'Contato',
        link: 'https://previsio.com.br/contato',
    }
];

const Footer = () => (
    <Box component={'footer'} backgroundColor={theme.palette.previsio_blue.main} color={'#fff'} display={'block'} style={{ minHeight: '300px' }}>
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{
                            pl: { xs: 0, sm: 4 },
                            textAlign: { xs: 'center', sm: 'left' }
                        }}
                    >
                        Contato
                    </Typography>

                    <Divider
                        color={theme.palette.primary.main}
                        sx={{
                            mx: 4,
                            height: 2,
                            width: { xs: 'auto', sm: 40 },
                        }} />

                    <List dense sx={{ px: 2 }}>
                        <ListItem key={'endereco'}>
                            <ListItemIcon>
                                <LocationOnIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Rua Júlio de Castilhos, 45 Niterói - Canoas /RS" />
                        </ListItem>

                        <ListItem key={'email'}>
                            <ListItemIcon>
                                <MailOutlineIcon color="primary" />
                            </ListItemIcon>
                            <Link href="mailto:comercial@previsio.com.br" style={{ color: '#fff', textDecoration: 'none' }}>
                                <ListItemText primary="comercial@previsio.com.br" />
                            </Link>
                        </ListItem>

                        <ListItem key={'telefone'}>
                            <ListItemIcon>
                                <PhoneInTalkIcon color="primary" />
                            </ListItemIcon>
                            <Link href="tel:+55(51)34669601" style={{ color: '#fff', textDecoration: 'none' }}>
                                <ListItemText primary="(51) 3466.9601" />
                            </Link>                            
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{
                            pl: { xs: 0, sm: 4 },
                            textAlign: { xs: 'center', sm: 'left' }
                        }}
                    >
                        Índice
                    </Typography>
                    <Divider
                        color={theme.palette.primary.main}
                        sx={{
                            mx: 4,
                            height: 2,
                            width: { xs: 'auto', sm: 40 },
                        }}
                    />
                    <List dense sx={{ px: 2 }}>
                        {navItems.map((item) => (
                            <ListItem key={item.text} sx={{py:0}}>
                                <ListItemIcon>
                                    <RadioButtonUncheckedIcon color="primary" fontSize="small" />
                                </ListItemIcon>
                                <Link href={item.link} style={{ color: '#fff', textDecoration: 'none' }}>
                                    <ListItemText primary={item.text}/>
                                </Link>
                            </ListItem>
                        ))
                        }
                    </List>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

export default Footer;
