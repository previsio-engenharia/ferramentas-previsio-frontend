const RespostaErro = ({dados}) => {
    return(
        <div className='resposta-erro'>
            <p className='error'>{dados.mensagem || dados.message}</p>
        </div>
    );
}

export default RespostaErro;