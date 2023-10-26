import Link from "next/link";
import { Container, Grid, Typography, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const Footer = () => (
    <footer style={{ background: '#061018', color: 'white', minHeight:'300px' }}>
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} >
                    <Typography variant="h5" fontWeight={600} paddingLeft={4}>
                        Contato
                    </Typography>
                    <Divider />
                    <List dense sx={{px: 2}}>
                        <ListItem>
                            <ListItemIcon>
                                <LocationOnIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Rua Júlio de Castilhos, 45 Niterói - Canoas /RS" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <MailOutlineIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<a href="mailto:comercial@previsio.com.br">comercial@previsio.com.br</a>} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PhoneInTalkIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={<a href="tel:+55(51)34669601">(51) 3466.9601</a>} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" fontWeight={600} paddingLeft={4}>
                        Índice
                    </Typography>
                    <Divider />
                    <List dense sx={{px: 2}}>
                        <ListItem>
                            <ListItemIcon>
                                <RadioButtonUncheckedIcon color="primary" fontSize="small"/>
                            </ListItemIcon>
                            <Typography variant="inherit">
                                <Link href="https://previsio.com.br">Início</Link>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <RadioButtonUncheckedIcon color="primary" fontSize="small"/>
                            </ListItemIcon>
                            <Typography variant="inherit">
                                <Link href="https://previsio.com.br/seguranca-do-trabalho/">Soluções e Serviços</Link>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <RadioButtonUncheckedIcon color="primary" fontSize="small"/>
                            </ListItemIcon>
                            <Typography variant="inherit">
                                <Link href="https://previsio.com.br/artigos/">Artigos</Link>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <RadioButtonUncheckedIcon color="primary" fontSize="small"/>
                            </ListItemIcon>
                            <Typography variant="inherit">
                                <Link href="https://previsio.com.br/downloads/">Downloads</Link>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <RadioButtonUncheckedIcon color="primary" fontSize="small"/>
                            </ListItemIcon>
                            <Typography variant="inherit">
                                <Link href="https://ferramentas.previsio.com.br">Ferramentas</Link>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <RadioButtonUncheckedIcon color="primary" fontSize="small"/>
                            </ListItemIcon>
                            <Typography variant="inherit">
                                <Link href="https://previsio.com.br/contato/">Contato</Link>
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    </footer>
);

export default Footer;
