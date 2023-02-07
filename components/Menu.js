import $ from 'jquery';
import { mostrarMenu } from '../public/src/menu.js';
import Image from 'next/image';
import Link from 'next/link';
import logoPrevisio from '../public/previsio_logo.png'

const Menu = () => (
    
    <div>
        <nav className="navbar">
            <div className="max-width">
                <div className="logo">
                    <a href="https://previsio.com.br/">
                        <Image 
                            src={logoPrevisio} alt='logo da empresa'
                            height={90}
                            width='auto'
                            priority
                        />
                    </a>
                </div>
                <ul className="menu">
                    <li><a href="https://previsio.com.br/" className="menu-item inicio">Início</a></li>

                    <li><a href="https://previsio.com.br/seguranca-do-trabalho/" className="menu-item solucoes">Soluções e Serviços</a></li>

                    <li><a href="https://previsio.com.br/clientes/" className="menu-item clientes">Clientes</a></li>

                    <li><a href="https://previsio.com.br/artigos/" className="menu-item artigos">Artigos</a></li>

                    <li><a href="https://previsio.com.br/nrs/" className="menu-item nrs">NR's</a></li>

                    <li><a href="https://previsio.com.br/downloads/" className="menu-item downloads">Downloads</a></li>

                    <li><Link href="/" className="menu-item ferramentas">Ferramentas</Link></li>

                    <li><a href="https://previsio.com.br/contato/" className="menu-item contato">Contato</a></li>

                </ul>
                <div className="menu-btn" onClick={mostrarMenu}>
                    <i className="fa-solid fa-bars"></i>
                </div>

            </div>
        </nav>
    </div>
);

export default Menu;
