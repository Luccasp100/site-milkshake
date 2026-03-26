import './Footer.css'

function Footer({ telaAtual }) { // Recebe a prop aqui
    return (
        /* Se a tela for 'home', adiciona a classe 'bg-home', senão 'bg-branco' */
        <footer className={`footer-container ${telaAtual === 'home' ? 'bg-home' : 'bg-branco'}`}>
            <div className='footer-linha-fina'></div>
            <div className='footer-content'>
                <p className='footer-texto'>Feito por Luccas Fernandes</p>
                <div className='footer-redes'>
                    <a href="https://github.com/Luccasp100" target="_blank" rel="noopener noreferrer">
                        <img src="./image/Github.svg" alt="Github" className="footer-icone" />
                    </a>
                    <a href="https://www.linkedin.com/in/luccas-fernandes/" target="_blank" rel="noopener noreferrer">
                        <img src="./image/Linkedin.svg" alt="Linkedin" className="footer-icone" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;