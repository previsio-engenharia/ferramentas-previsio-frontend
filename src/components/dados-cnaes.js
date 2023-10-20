
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

export default function TabelaDadosCnaes({ dadosCnaes, startOpen }) {

    return (
        <Accordion defaultExpanded={startOpen} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}

                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5">CNAEs</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Denominação</TableCell>
                                <TableCell>Grau de Risco</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dadosCnaes.map((item, index) => (
                                <StyledTableRow key={index}>
                                    <TableCell>{item.codigo}</TableCell>
                                    <TableCell>{item.denominacao}</TableCell>
                                    <TableCell>{item.grauDeRisco}</TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </AccordionDetails>
        </Accordion>
    )
}