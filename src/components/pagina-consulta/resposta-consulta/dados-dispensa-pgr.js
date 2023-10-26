import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

export default function TabelaDadosDispensaPgr() {

    return (
        <Accordion defaultExpanded={true} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5" component='h3' >Programa de Gerenciamento de Riscos (PGR)</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12} sm={2} align={'center'} justifyContent="center" >
                        <InfoTwoToneIcon color={'primary'} sx={{ fontSize: 64, m: 2 }} />
                    </Grid>
                    <Grid item xs={12} sm={10} 
                        sx={{ 
                            p: 2
                        }}
                    >
                        <Typography
                            paragraph
                            align="justify"
                        >
                            Com as características encontradas, a empresa consultada <strong>dispensa a elaboração de PGR</strong>. Também está dispensada da elaboração de PCMSO, desde que <strong>não</strong> sejam identificados riscos físicos, químicos, biológicos ou relacionados a fatores ergonômicos.
                        </Typography>
                        <Typography
                            paragraph
                            align="justify"
                        >
                            Para a comprovação desta dispensa, é necessária a elaboração da <strong>Declaração de Inexistência de Riscos</strong>.
                        </Typography>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}


