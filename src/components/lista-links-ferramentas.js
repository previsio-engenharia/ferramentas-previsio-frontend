//import { esconderAviso } from "lib/aviso";
'use client'

//mui
import { Box, Button, Card, CardActions, CardContent, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { theme } from 'styles/themes';
import Link from 'next/link';


export function ListaLinksFerramentas() {

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
                            <ListItemText primary='Consulta Dimensionamento SESMT' secondary='NR04' sx={{
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
                            <ListItemText primary='Consulta Dimensionamento CIPA' secondary='NR05' sx={{
                                color: theme.palette.primary.main
                            }} />
                        </ListItemButton>
                    </ListItem>
                </Link>

            </List>
        </Box>
    )
}


export function ListaLinkIndex() {
    return (
        <List sx={{ my: 2 }}>
            <Link href={'/'} style={{ textDecoration: 'none' }}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{
                            color: theme.palette.primary.main
                        }}>
                            <ArrowBackIcon />
                        </ListItemIcon>
                        <ListItemText primary='Retornar à Lista de Ferramentas' sx={{
                            color: theme.palette.primary.main
                        }} />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
    )
}