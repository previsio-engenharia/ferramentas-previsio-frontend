import Link from 'next/link';

export default function Home(){
    return(
        <>
            <section className='contact'>
                <div className='max-width'>
                    <h2 className='title'>Ferramentas</h2>                    
                    <div className='contact-content'>                        
                        <div className='column left'>
                            <div className='titulo-consulta'>
                                Normas Regulamentadoras (NRs)                             
                            </div>
                            <ul className='lista-ferramentas'>
                                <br/><li><Link target="_self" href="/consulta-grau-de-risco"><i className="fa-sharp fa-solid fa-arrow-right"></i> GR: Consulta Grau de Risco</Link></li>
                                <br/><li><Link target="_self" href="/consulta-nr04"><i className="fa-sharp fa-solid fa-arrow-right"></i> NR-04: Consulta equipe SESMT</Link></li>
                                <br/><li><Link target="_self" href="/consulta-nr05"><i className="fa-sharp fa-solid fa-arrow-right"></i> NR-05: Consulta equipe CIPA</Link></li>
                            </ul>
                        </div>
                        <div className='column right'>
                            <div className='titulo-consulta'>
                                Ferramentas de Consulta
                            </div>
                            <div>
                                <p>Disponibilizamos ferramentas para consulta de dados das NRs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}