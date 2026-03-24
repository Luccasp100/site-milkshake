import './Footer.css'

function Footer() {
    return (
        <footer className='footer-container'>
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