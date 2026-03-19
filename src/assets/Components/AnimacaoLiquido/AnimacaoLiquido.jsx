import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AnimacaoLiquido.css';

const AnimacaoLiquido = ({ onFinalizado }) => {
    // 1. REFERÊNCIAS (Refs) - Onde o GSAP "toca" no DOM
    const canoRef = useRef(null);      // O jato de líquido que cai do topo
    const liquidoRef = useRef(null);    // O reservatório (fundo) que enche a tela

    // Criamos refs individuais para cada frase para evitar o uso de State
    // Isso impede que o líquido trave durante as trocas de mensagem
    const texto1Ref = useRef(null);
    const texto2Ref = useRef(null);
    const texto3Ref = useRef(null);

    useEffect(() => {
        // Criamos a Timeline principal
        const tl = gsap.timeline({
            onComplete: onFinalizado
        });

        // --- PASSO 1: A QUEDA ---
        // Faz o cano (jato) descer rápido até o final da tela
        tl.to(canoRef.current, {
            height: '100vh',
            duration: 0.6,
            ease: "power2.in"
        });

        // --- PASSO 2: O ENCHIMENTO (O MOTOR PRINCIPAL) ---
        // Criamos um "label" chamado "subindo" para disparar as animações juntas
        tl.addLabel("subindo");

        tl.to(liquidoRef.current, {
            height: '100vh',
            y: 0,
            duration: 3, // <-- AUMENTE AQUI para o líquido 3
            ease: "none" // "none" garante que ele suba sem dar trancos ou pausas
        }, "subindo");

        // --- PASSO 3: SEQUÊNCIA DE TEXTOS (Sem setMensagem para não travar o React) ---
        // Usamos "subindo+=X" para rodar o texto ENQUANTO o líquido está subindo.

        // FRASE 1: "Vamos montar o seu pedido..."
        tl.fromTo(texto1Ref.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            "subindo+=1.3"
        );
        tl.to(texto1Ref.current, { opacity: 0, y: -20, duration: 0.4 }, "subindo+=3.0");

        // FRASE 2: "Montando opções..."
        tl.fromTo(texto2Ref.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            "subindo+=3.5"
        );
        tl.to(texto2Ref.current, { opacity: 0, y: -20, duration: 0.4 }, "subindo+=5.7");

        // FRASE 3: "Pronto, vamos montar o seu milkshake!"
        tl.fromTo(texto3Ref.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            "subindo+=6.2"
        );
        tl.to(texto3Ref.current, { opacity: 0, duration: 0.5 }, "subindo+=8.0");

        // --- PASSO 4: FINALIZAÇÃO (DESCORRER) ---

        // 1. O jato some primeiro para não ficar "voando"
        tl.to(canoRef.current, {
            opacity: 0,
            duration: 0.3
        }, "subindo+=7.5");

        // 2. O reservatório inteiro desce para fora da tela (Efeito de ralo)
        tl.to(liquidoRef.current, {
            y: '120vh',        // Move o líquido todo para baixo (além da tela)
            duration: 1.2,     // Velocidade da "descida"
            ease: "power2.in", // Começa devagar e acelera (efeito de gravidade)
            onComplete: onFinalizado // Só muda de tela quando ele terminar de descer
        }, "subindo+=8.6");

        // --- ANIMAÇÕES EXTRAS (Fora da timeline para serem infinitas) ---

        // Pulsação do jato (espreme e estica)
        gsap.to(canoRef.current, {
            scaleX: 1,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Movimento lateral das ondas (Nunca para)
        gsap.to(".onda-svg", {
            x: "-90%",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "linear"
        });

    }, [onFinalizado]);

    return (
        <div className="transicao-wrapper">
            {/*3 textos fixos, o GSAP apenas mostra um por vez via Ref */}
            <div ref={texto1Ref} className="texto-teste">Vamos montar o seu pedido...</div>
            <div ref={texto2Ref} className="texto-teste">Montando opções...</div>
            <div ref={texto3Ref} className="texto-teste">Pronto, vamos montar o seu milkshake!</div>

            <div className="camada-liquido">
                {/* Filtro para o efeito viscoso do líquido */}
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    </filter>
                </svg>

                <div className="container-fluxo">
                    <div ref={canoRef} className="fluxo-liquido"></div>
                </div>

                <div ref={liquidoRef} className="preenchimento-liquido">
                    <div className="container-ondas">
                        <div className="onda-svg-wrapper wave-atras">
                            <Onda className="onda-svg" fill="#ff9494" />
                            <Onda className="onda-svg" fill="#ff9494" />
                        </div>
                        <div className="onda-svg-wrapper wave-frente">
                            <Onda className="onda-svg" fill="#f27a7a" />
                            <Onda className="onda-svg" fill="#f27a7a" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-componente para o desenho do SVG das ondas
const Onda = ({ className, fill }) => (
    <svg className={className} viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z" fill={fill} />
    </svg>
);

export default AnimacaoLiquido;


{/* 
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './AnimacaoLiquido.css';

const AnimacaoLiquido = ({ onFinalizado }) => {

    // 1. REFERÊNCIAS (Refs) - Onde o GSAP "toca" no DOM
    const canoRef = useRef(null);      // O jato de líquido que cai do topo
    const liquidoRef = useRef(null);    // O reservatório (fundo) que enche a tela
    const textoRef = useRef(null);      // O texto central (Ex: "Montando pedido...")

    // 2. ESTADO (State) - Para trocar as frases dinamicamente durante a animação
    const [mensagem, setMensagem] = useState("Vamos montar o seu pedido...");

    useEffect(() => {

        // Criamos a Timeline principal
        const tl = gsap.timeline({
            onComplete: onFinalizado
        });

        // --- PASSO 1: A QUEDA ---
        // Faz o cano (jato) descer rápido até o final da tela
        tl.to(canoRef.current, {
            height: '100vh',
            duration: 0.6,
            ease: "power2.in"
        });
        // --- PASSO 2: O ENCHIMENTO & FADE-IN (Sincronizados) ---
        // Criamos um "label" chamado "subindo" para disparar as animações juntas
        tl.addLabel("subindo");

        // O líquido sobe preenchendo a tela
        tl.to(liquidoRef.current, {
            height: '100vh',
            y: 0,
            duration: 3, // <-- AUMENTE AQUI para o líquido demorar mais
            ease: "none"   // "none" garante que ele suba sem dar trancos ou pausas
        }, "subindo");

        // --- PASSO 3: SEQUÊNCIA DE MENSAGENS (Sem travar a subida) ---
        // Usamos "subindo+=X" para rodar o texto ENQUANTO o líquido está subindo.

        // Mensagem 1 (Entrada)
        tl.fromTo(textoRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            "subindo+=1.3" // Começa meio segundo após o líquido iniciar a subida
        );

        // Troca para Mensagem 2 (Aos 2.5 segundos da subida total)
        tl.to(textoRef.current, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => setMensagem("Montando opções...")
        }, "subindo+=3.0");
        tl.to(textoRef.current, { opacity: 1, duration: 0.4 }, "subindo+=3.5");

        // Troca para Mensagem 3 (Aos 5 segundos da subida total)
        tl.to(textoRef.current, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => setMensagem("Pronto, vamos montar o seu milkshake!")
        }, "subindo+=5.7");
        tl.to(textoRef.current, { opacity: 1, duration: 0.4 }, "subindo+=6.2");

        // --- PASSO 4: FINALIZAÇÃO DO FLUXO (O líquido desce e some) ---
        // 1. O jato (cano) some primeiro para não ficar "voando"
        tl.to(canoRef.current, {
            opacity: 0,
            duration: 0.3
        }, "subindo+=7.5"); // Um pouco antes do final dos 8s

        // 2. O texto também some para limpar o visual
        tl.to(textoRef.current, {
            opacity: 0,
            duration: 0.5
        }, "subindo+=7.5");

        // 3. A MÁGICA: O reservatório inteiro desce para fora da tela
        tl.to(liquidoRef.current, {
            y: '120vh',        // Move o líquido todo para baixo
            duration: 1.1,     // Velocidade da "descida"
            ease: "power2.in", // Começa devagar e acelera (efeito de gravidade)
            onComplete: onFinalizado // Só muda de tela quando ele terminar de descer
        }, "subindo+=8.0");

        // --- ANIMAÇÕES EXTRAS (Fora da timeline para serem infinitas) ---
        // Pulsação do jato (espreme e estica)
        gsap.to(canoRef.current, {
            scaleX: 2,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Movimento lateral das ondas (Nunca para)
        gsap.to(".onda-svg", {
            x: "-50%",
            duration: 3,
            repeat: -1,
            ease: "linear"
        });
    }, [onFinalizado]);

    const Onda = ({ className, fill }) => (
        <svg className={className} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z" fill={fill} />
        </svg>
    );

    return (
        <div className="transicao-wrapper">
            <div ref={textoRef} className="texto-teste">
                {mensagem}
            </div>

            <div className="camada-liquido">
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    </filter>
                </svg>

                <div className="container-fluxo">
                    <div ref={canoRef} className="fluxo-liquido"></div>
                </div>

                <div ref={liquidoRef} className="preenchimento-liquido">
                    <div className="container-ondas">
                        <div className="onda-svg-wrapper wave-atras">
                            <Onda className="onda-svg" fill="#ff9494" />
                            <Onda className="onda-svg" fill="#ff9494" />
                        </div>

                        <div className="onda-svg-wrapper wave-frente">
                            <Onda className="onda-svg" fill="#f27a7a" />
                            <Onda className="onda-svg" fill="#f27a7a" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimacaoLiquido;    
*/}