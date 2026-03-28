import React, { useState, useEffect } from 'react';
import './Home.css';
import { section } from 'motion/react-client';
import iconeSetaEsquerda from '/image/SetaCarrossel.svg'; // Exemplo de caminho
import iconeSetaDireita from '/image/SetaCarrossel.svg'; // Exemplo de caminho

const Home = ({ onIniciar }) => {
    // Dados para o Carrossel da última seção
    const milkshakesCarrossel = [
        {
            id: 1, nome: 'Baunilha',
            sabor: 'baunilha',
            src: "/image/TelaHomeSemFundo/MilkshakeBaunilhaHome-Semfundo.png"
        },
        {
            id: 2, nome: 'Morango',
            sabor: 'morango',
            src: "/image/TelaHomeSemFundo/milkshakeMorangoHome-Semfundo.png"
        },
        {
            id: 3, nome: 'Chocolate',
            sabor: 'chocolate',
            src: "/image/TelaHomeSemFundo/MilkshakeChocolateHome-Semfundo.png"
        },
        {
            id: 4, nome: 'Flocos',
            sabor: 'flocos',
            src: "/image/TelaHomeSemFundo/MilkshakeFlocosHome-Semfundo.png"
        },
        {
            id: 5, nome: 'Banana',
            sabor: 'banana',
            src: "/image/TelaHomeSemFundo/MilkshakeBananaHome-Semfundo.png"
        }
    ];



    const [indiceAtual, setIndiceAtual] = useState(0);

    // Lógica do Carrossel Automático (5 segundos)
    useEffect(() => {
        const intervalo = setInterval(() => {
            proximoSlide();
        }, 5000);
        return () => clearInterval(intervalo);
    }, [indiceAtual]);

    const proximoSlide = () => {
        setIndiceAtual((prev) => (prev === milkshakesCarrossel.length - 1 ? 0 : prev + 1));
    };

    const slideAnterior = () => {
        setIndiceAtual((prev) => (prev === 0 ? milkshakesCarrossel.length - 1 : prev - 1));
    };

    return (
        <section className='home-page-wrapper'>
            <div className="home-container">
                <header className="home-header">
                    <h1 className="titulo-app">Milkshake<span className='texto-destaque'>Mania</span></h1>
                </header>

                {/* SEÇÃO 1 - CHOCOLATE (DIREITA) */}
                <section className="secao-apresentacao secao-chocolate">
                    <div className="conteudo-secao">
                        <h2 className="titulo-secao">O jeito <span className='texto-destaque'>Mania</span> de ser!</h2>
                        <p className="texto-secao">
                            Por que escolher o comum quando você pode criar o extraordinário? Escolha seus sabores favoritos, temos adicionais incríveis e monte uma combinação única que é a sua cara!
                        </p>
                    </div>
                    <div className="janela-milkshake cor-janela-milkshake-chocolate">
                        <img
                            src="/image/TelaHomeSemFundo/MilkshakeChocolateHome-Semfundo.png"
                            alt="Milkshake Chocolate"
                            className="img-animada-milkshake"
                        />
                    </div>
                </section>

                {/* SEÇÃO 2 - MORANGO (ESQUERDA) */}
                <section className="secao-apresentacao imagem-esquerda">
                    <div className="conteudo-secao">
                        <h2 className="titulo-secao">Impossível provar um só!</h2>
                        <p className="texto-secao">
                            Cuidado: nossos sabores são viciantes. O que começa com um simples gole por curiosidade rapidamente se transforma em uma <strong><span className='texto-destaque'>mania</span></strong> sem volta, onde cada nova combinação descoberta é uma nova razão para voltar.
                        </p>
                    </div>
                    <div className="janela-milkshake cor-janela-milkshake-morango">
                        <img
                            src="/image/TelaHomeSemFundo/milkshakeMorangoHome-Semfundo.png"
                            alt="Milkshake Morango"
                            className="img-animada-milkshake"
                        />
                    </div>
                </section>

                {/* SEÇÃO 3 - CARROSSEL (BANER DESTAQUE) */}
                <section className="secao-apresentacao banner-destaque secao-horizontal">
                    {/* Bloco de Texto (Esquerda) */}
                    <div className="conteudo-secao flex-texto">
                        <h2 className="titulo-secao">Temos várias opções!</h2>
                        <p className="texto-secao">
                            Deixe-se levar por uma textura irresistível e sabores que refrescam o seu dia. Cada copo é uma tela em branco: escolha seu sabor favorito, capriche nos adicionais e crie a combinação perfeita para você.
                        </p>
                    </div>

                    {/* Container do Carrossel (Direita) */}
                    <div className="container-imagem-destaque carrossel-wrapper">
                        <button className="seta-carrossel esquerda" onClick={slideAnterior}>
                            <img src={iconeSetaEsquerda} alt="Anterior" className="img-seta-carrossel" />
                        </button>

                        <div className={`janela-carrossel sabor-${milkshakesCarrossel[indiceAtual].sabor}`}>
                            <img
                                key={milkshakesCarrossel[indiceAtual].id}
                                src={milkshakesCarrossel[indiceAtual].src}
                                alt={milkshakesCarrossel[indiceAtual].nome}
                                className="img-carrossel-animada"
                            />
                            <div className="legenda-sabor" key={`nome-${indiceAtual}`}>
                                {milkshakesCarrossel[indiceAtual].nome}
                            </div>
                        </div>

                        <button className="seta-carrossel direita" onClick={proximoSlide}>
                            <img src={iconeSetaDireita} alt="Próximo" className="img-seta-carrossel" />
                        </button>
                    </div>
                </section>
                <footer className="home-footer">
                    <button className="btn-montar-pedido" onClick={onIniciar}>Montar seu Milkshake</button>
                </footer>
            </div>
        </section>

    );
};

export default Home;