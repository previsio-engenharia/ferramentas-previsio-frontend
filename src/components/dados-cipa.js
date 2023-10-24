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

export default function TabelaDadosCipa({ dadosCipa }) {

    return (
        <Accordion defaultExpanded={true} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5" component='h3' >Equipe CIPA necessária</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableBody>
                            <StyledTableRow
                                key={'head'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell></TableCell>
                                <TableCell component={'th'} align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }}>Representantes da organização</Typography>
                                </TableCell>
                                <TableCell component={'th'} align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }}>Representantes dos empregados</Typography>
                                </TableCell>

                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'equipeEfetiva'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component={'th'} align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }}>Membros da equipe efetiva</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosCipa.cipaEfetivos}</TableCell>
                                <TableCell align="left">{dadosCipa.cipaEfetivos}</TableCell>
                            </StyledTableRow>
                            {/** */}
                            <StyledTableRow
                                key={'equipeSuplente'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" sx={{ maxWidth: 200 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }} >Membros da equipe suplente</Typography>
                                </TableCell>
                                <TableCell align="left">{dadosCipa.cipaSuplentes}</TableCell>
                                <TableCell align="left">{dadosCipa.cipaSuplentes}</TableCell>
                            </StyledTableRow>

                        </TableBody>
                        < TableFooter >
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <p>Os representantes da organização na CIPA, titulares e suplentes, serão por ela designados.</p>
                                    <p>Os representantes dos empregados, titulares e suplentes, serão eleitos em escrutínio secreto, do qual participem, independentemente de filiação sindical, exclusivamente os empregados interessados.</p>
                                </TableCell>
                            </TableRow>
                        </TableFooter>


                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion >
    )
}


