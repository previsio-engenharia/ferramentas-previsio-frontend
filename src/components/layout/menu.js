//react
import * as React from 'react';
//next
import Link from 'next/link';
import Image from 'next/image';
//MUI
import {AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from 'styles/themes';
//consts
const drawerWidth = 240;
//inserir itens de MENU aqui
const navItems = [
    {
        text: 'Site',
        link: 'https://previsio.com.br',
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

function Menu(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                <Image
                    src="/previsio_logo_vd.svg"
                    alt="Logo Previsio Engenharia"
                    width={45}
                    height={45}
                />
                <Typography
                    style={{ fontFamily: '"Roboto Slab", sans-serif' }}
                    variant="h6"
                    fontSize={32}
                    align='left'
                    color={'#061018'}
                    marginLeft={2}
                    sx={{ my: 2 }}>
                    Previsio
                </Typography>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <Link href={item.link} key={item.text} style={{ textDecoration: 'none' }}>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: theme.palette.primary.main }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Image
                        src="/previsio_logo_bc.svg"
                        alt="Logo Previsio Engenharia"
                        width={30}
                        height={30}
                    />
                    <Typography
                        style={{ fontFamily: '"Roboto Slab", sans-serif' }}
                        variant="h6"
                        fontSize={28}
                        component="div"
                        marginLeft={2}
                        sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                    >
                        Previsio
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link href={item.link} key={item.text} style={{ textDecoration: 'none' }}>

                                <Button key={item.text} sx={{ color: '#fff' }}>
                                    {item.text}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}


export default Menu;
