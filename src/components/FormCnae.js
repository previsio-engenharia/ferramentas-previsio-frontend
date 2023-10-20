import { Button, FormControlLabel, Grid, Switch, TextField, Tooltip } from "@mui/material"
import InputMask from "react-input-mask"

export default function FormCnae(props) {
    const { dataForm, setDataForm } = props

    const onChangeInput = e => setDataForm({
        ...dataForm,
        [e.target.name]: e.target.value
    });

    return (
        <>
            <Grid
                container
                item
                spacing={2}
            >
                <Grid item xs={12}>

                    <InputMask
                        type="text"
                        mask="99.99-9"
                        onChange={onChangeInput}
                        value={dataForm.codigo_cnae1}
                    >
                        {() => (
                            <Tooltip title="A atividade econômica principal é a constante no Cadastro Nacional de Pessoa Jurídica - CNPJ" arrow disableInteractive>
                                <TextField
                                    type="text"
                                    name="codigo_cnae1"
                                    fullWidth
                                    label="CNAE principal da empresa"
                                    variant="outlined" />
                            </Tooltip>
                        )}
                    </InputMask>

                </Grid>

                <Grid item xs={12}>

                    <InputMask
                        type="text"
                        mask="99.99-9"
                        onChange={onChangeInput}
                        value={dataForm.codigo_cnae2}
                    >
                        {() => (
                            <Tooltip title="A atividade econômica preponderante é aquela que ocupa o maior número de trabalhadores" arrow disableInteractive>
                                <TextField
                                    type="text"
                                    name="codigo_cnae2"
                                    fullWidth
                                    label="CNAE preponderante da empresa"
                                    variant="outlined" />
                            </Tooltip>
                        )}
                    </InputMask>
                </Grid>
                {
                    dataForm.receberEmail ? (
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                name="userEmail"
                                fullWidth
                                label="E-mail"
                                variant="outlined"
                                onChange={onChangeInput}
                                value={dataForm.userEmail}
                            />
                        </Grid>

                    ) : (null)
                }

                <Grid item xs={12}>
                    <FormControlLabel control={
                        <Switch
                            checked={dataForm.receberEmail}
                            onChange={() => {
                                setDataForm((previousState) => ({
                                    ...previousState,
                                    receberEmail: !previousState.receberEmail
                                })
                                )
                            }}
                        />}
                        label="Desejo receber relatório da consulta por e-mail"
                    />
                </Grid>
                {/*
                <Grid item xs={12}>
                    <Button variant="contained" fullWidth>Consultar </Button>
                </Grid>
                */}
            </Grid>
        </>
    )
}

