import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import InternalLink from 'components/internal-link';
import Link from 'next/link';
//mui-icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Home() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h3' component='h1' textAlign={'center'}>Ferramentas</Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant='h6' component='h2' textAlign={'center'}>
                        Normas Regulamentadoras (NRs)
                    </Typography>
                    <List>
                        <InternalLink href={"/consulta-grau-de-risco"}>
                            <ListItem>
                                <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                                <ListItemText primary='GR: Consulta Grau de Risco' />
                            </ListItem>
                        </InternalLink>
                        <InternalLink href={"/consulta-nr04"}>
                            <ListItem>
                                <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                                <ListItemText primary='NR-04: Consulta equipe SESMT' />
                            </ListItem>
                        </InternalLink>
                        <InternalLink href={"/consulta-nr05"}>
                            <ListItem>
                                <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                                <ListItemText primary='NR-05: Consulta equipe CIPA' />
                            </ListItem>
                        </InternalLink>
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' component='h2' textAlign={'center'}>
                        Ferramentas de Consultas
                    </Typography>
                    <Typography variant='body1' sx={{py:2,px:2}}>
                        Disponibilizamos ferramentas para consulta de dados das NRs.
                    </Typography>
                </Grid>
            </Grid>




            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Ferramentas</h2>
                    <div className='contact-content'>
                        <div className='column left'>
                            <div className='titulo-consulta'>
                                Normas Regulamentadoras (NRs)
                            </div>
                            <ul className='lista-ferramentas'>
                                <br /><li><Link target="_self" href="/consulta-grau-de-risco"><i className="fa-sharp fa-solid fa-arrow-right"></i> GR: Consulta Grau de Risco</Link></li>
                                <br /><li><Link target="_self" href="/consulta-nr04"><i className="fa-sharp fa-solid fa-arrow-right"></i> NR-04: Consulta equipe SESMT</Link></li>
                                <br /><li><Link target="_self" href="/consulta-nr05"><i className="fa-sharp fa-solid fa-arrow-right"></i> NR-05: Consulta equipe CIPA</Link></li>
                            </ul>
                        </div>
                        <div className='column right'>
                            <div className='titulo-consulta'>
                                Ferramentas de Consulta
                            </div>
                            <div>
                                <p>Disponibilizamos ferramentas para consulta de dados das NRs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}