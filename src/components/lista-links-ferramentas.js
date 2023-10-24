//import { esconderAviso } from "lib/aviso";
'use client'

//mui
import { Box, Button, Card, CardActions, CardContent, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { theme } from 'styles/themes';
import Link from 'next/link';


export default function ListaLinksFerramentas() {

    return (
        <Box>
            <List>
                <Link href={`/consulta-grau-de-risco`} style={{ textDecoration: 'none' }}>
                    {/** */}
                    <ListItem disablePadding>
                        <ListItemButton >
                            <ListItemIcon sx={{
                                color: theme.palette.primary.main
                            }}>
                                <ArrowForwardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Consulta Grau de Risco' secondary='NR04' sx={{
                                color: theme.palette.primary.main
                            }} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Divider />

                {/** */}
                <Link href={`/consulta-nr04`} style={{ textDecoration: 'none' }}>
                    <ListItem disablePadding>
                        <ListItemButton >
                            <ListItemIcon sx={{
                                color: theme.palette.primary.main
                            }}>
                                <ArrowForwardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Consulta Equipe SESMT' secondary='NR04' sx={{
                                color: theme.palette.primary.main
                            }} />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Divider />
                {/** */}
                <Link href={`/consulta-nr05`} style={{ textDecoration: 'none' }}>
                    <ListItem disablePadding>
                        <ListItemButton >
                            <ListItemIcon sx={{
                                color: theme.palette.primary.main
                            }}>
                                <ArrowForwardIcon />
                            </ListItemIcon>
                            <ListItemText primary='Consulta Equipe CIPA' secondary='NR05' sx={{
                                color: theme.palette.primary.main
                            }} />
                        </ListItemButton>
                    </ListItem>
                </Link>

            </List>
        </Box>
    )
}