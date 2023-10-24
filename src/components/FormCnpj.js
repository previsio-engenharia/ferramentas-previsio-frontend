import { Box, Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material"
import InputMask from "react-input-mask"

/**
 * necessário tratar / validar os dados do formulario aqui?
 */

export default function FormCnpj(props) {
    //extrai estados de controle do formulario das props do componente
    const { dataForm, setDataForm } = props
    //função que atualiza dados no formulario
    const onChangeInput = e => {
        let valueToSave = null
        //se o campo for o nro de trabalhadores, só permite salvar dígitos numéricos     
        if (e.target.name == 'numero_trabalhadores') {
            valueToSave = e.target.value.replace(/[^0-9]/g, '');
        }
        else {
            valueToSave = e.target.value
        }
        setDataForm({
            ...dataForm,
            //[e.target.name]: e.target.value
            [e.target.name]: valueToSave
        })
    };

    return (
        <Grid
            container
            item
            spacing={2}
        >
            <Grid item xs={12}>
                <InputMask
                    type="text"
                    mask="99.999.999/9999-99"
                    onChange={onChangeInput}
                    value={dataForm.cnpj}
                >
                    {() => <TextField
                        type="text"
                        name="cnpj"
                        fullWidth
                        label="CNPJ da empresa"
                        variant="outlined"
                    />}
                </InputMask>
            </Grid>
            {
                dataForm.consulta == 'nr04' || dataForm.consulta == 'nr05' ? (
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            name="numero_trabalhadores"
                            fullWidth
                            label="Número de trabalhadores"
                            variant="outlined"
                            onChange={onChangeInput}
                            value={dataForm.numero_trabalhadores}
                        />
                    </Grid>
                ) : (null)
            }

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

            <Grid item>
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
        </Grid>
    )
}