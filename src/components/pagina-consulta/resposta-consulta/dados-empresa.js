import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TabelaDadosEmpresa({ dadosDaEmpresa, cnaePrincipal, grauDeRisco }) {

    return (
        <Accordion defaultExpanded={true} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5" component='h3' >Dados da Empresa</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableBody>
                            {/** */}
                            <StyledTableRow
                                key={'cnpj'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component={'th'} align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }}>CNPJ</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosDaEmpresa.cnpj}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'razaoSocial'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Razão Social</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosDaEmpresa.razao_social}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'nomeFantasia'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Nome Fantasia</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosDaEmpresa.nome_fantasia}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'porte'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Porte da Empresa</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosDaEmpresa.porte}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'cnaePrincipalCodigo'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >CNAE Principal</Typography>
                                </TableCell>
                                <TableCell align="left">{cnaePrincipal.codigo}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'cnaePrincipalDenominacao'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Denominação</Typography>
                                </TableCell>
                                <TableCell align="left">{cnaePrincipal.denominacao}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'grauDeRisco'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Grau de Risco da Empresa</Typography>
                                </TableCell>
                                <TableCell align="left">{grauDeRisco}</TableCell>
                            </StyledTableRow>
                            {/** */
                                dadosDaEmpresa.numero_trabalhadores &&
                                <StyledTableRow
                                    key={'quantidadeTrabalhadores'}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" sx={{ maxWidth: 200 }}>
                                        <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Quantidade de Trabalhadores</Typography>
                                    </TableCell>
                                    <TableCell align="left">{dadosDaEmpresa.numero_trabalhadores}</TableCell>
                                </StyledTableRow>

                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    )
}


