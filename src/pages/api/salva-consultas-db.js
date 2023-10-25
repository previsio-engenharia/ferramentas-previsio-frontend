import Registro_Consulta from "models/Registro_Consulta";

export default async function handler(req, res) {
    // só aceita método POST. Se receber outro retorna erro
    
    if (req.method != 'POST') {
        return res.status(405).json({
            success: false,
            //statusConsulta:
            mensagem: 'Método da requisição não permitido',
        })
    }

    const data = req.body.data
    if (!data) {
        return res.status(400).json({
            success: false,
            mensagem: 'Informações faltantes na requisição',
        });
    }

    try {
        //insere registro no DB
        const registro = await Registro_Consulta.create({
            ...data
        });
        if (registro) {
            console.log('Registro inserido');
        }
    } catch (err) {
        console.log(`Erro ao salvar registro: ${err}`);
    }
    return res.status(201).json({
        success: true,
        mensagem: 'Registro adicionado ao DB',
    })
}