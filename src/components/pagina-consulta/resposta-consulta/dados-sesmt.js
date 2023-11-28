import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
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

export default function TabelaDadosSesmt({ dadosSesmt }) {

    return (
        <Accordion defaultExpanded={true} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5" component='h3' >Dimensionamento SESMT</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableBody>
                            {/** */}
                            <StyledTableRow
                                key={'tecnicosSeguranca'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component={'th'} align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }}>Técnicos de Segurança</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosSesmt.tecnicoSeg}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'engenheirosSeguranca'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Engenheiros de Segurança</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosSesmt.engenheiroSeg}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'tecnicosEnfermagem'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Auxiliares/Técnicos de Enfermagem</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosSesmt.auxTecEnfermagem}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'enfermeiros'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Enfermeiros</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosSesmt.enfermeiro}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'medicos'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Médicos</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosSesmt.medico}</TableCell>
                            </StyledTableRow>
                        </TableBody>
                        {
                            (dadosSesmt.obsSesmt1 /* || dadosSesmt.obsSesmt2 */ || dadosSesmt.obsSesmt3) &&
                            < TableFooter >
                            <TableRow>
                                <TableCell colSpan={2}>
                                    {
                                        dadosSesmt.obsSesmt1 && <p>{dadosSesmt.obsSesmt1}</p>
                                    }
                                    {/* //esta observação explica o cálculo para numero de trab > 5000
                                    dadosSesmt.obsSesmt2 && <p>{dadosSesmt.obsSesmt2}</p>
                                */}
                                    {
                                        dadosSesmt.obsSesmt3 && <p>{dadosSesmt.obsSesmt3}</p>
                                    }
                                </TableCell>
                                </TableRow>

                            </TableFooter>
                        }

                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion >
    )
}


