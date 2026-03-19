import React, { useState } from 'react';
import Home from './assets/Pages/Home/Home';
import AnimacaoLiquido from './assets/Components/AnimacaoLiquido/AnimacaoLiquido';
import OpcaoMilkshake from './assets/Components/OpcaoMilkshake/OpcaoMilkShake';
import OpcaoCaldas from './assets/Components/OpcaoCaldas/OpcaoCaldas'; 
import BarraTotal from './assets/Components/BarraPrecoTotal/BarraPrecoTotal';

function App() {
    // 1. ESTADOS DE NAVEGAÇÃO E ANIMAÇÃO
    const [tela, setTela] = useState('home');
    const [animando, setAnimando] = useState(false); // Controla se a classe fade-out está ativa

    // 2. ESTADOS DO PEDIDO (Preços acumulados)
    const [precoTamanho, setPrecoTamanho] = useState(0);
    const [precoCalda, setPrecoCalda] = useState(0);

    // Soma total calculada em tempo real
    const totalPedido = precoTamanho + precoCalda;

    // 3. LOGICA DE FILTRO DE ANIMAÇÃO
    // Criamos uma lista das telas que DEVEM ter o efeito de fade
    const telasComAnimacao = ['opcoes', 'caldas', 'sabores'];
    
    // Verificamos se a tela atual está na nossa lista de animação
    const deveAnimar = telasComAnimacao.includes(tela);

    // --- FUNÇÃO DE TRANSIÇÃO MESTRE ---
    const mudarDeTela = (novaTela, acaoExtra = () => {}) => {
        // Só aplicamos o delay de animação se estivermos navegando entre telas de opções
        if (telasComAnimacao.includes(tela) || telasComAnimacao.includes(novaTela)) {
            setAnimando(true); // Inicia o Fade Out
            
            setTimeout(() => {
                acaoExtra(); // Executa limpezas de estado (ex: zerar calda)
                setTela(novaTela); // Troca a tela no "escuro" (opacity 0)
                setAnimando(false); // Inicia o Fade In
            }, 300); 
        } else {
            // Se for transição Home -> Loading, muda instantaneamente sem delay
            acaoExtra();
            setTela(novaTela);
        }
    };

    // --- ATALHOS DE NAVEGAÇÃO ---
    const voltarParaTamanhos = () => mudarDeTela('opcoes', () => setPrecoCalda(0));
    const voltarParaCaldas = () => mudarDeTela('caldas');

    return (
        <div className="App">

            {/* O container abaixo decide se aplica as classes de animação.
                Se 'deveAnimar' for false (Home/Loading), ele não coloca classe nenhuma,
                evitando que o site todo fique piscando no início.
            */}
            <div className={deveAnimar ? (animando ? 'fade-out' : 'fade-in') : ''}>
                
                {/* TELA 1: HOME */}
                {tela === 'home' && (
                    <Home onIniciar={() => mudarDeTela('loading')} />
                )}

                {/* TELA 2: LOADING */}
                {tela === 'loading' && (
                    <AnimacaoLiquido onFinalizado={() => mudarDeTela('opcoes')} />
                )}

                {/* TELA 3: SELEÇÃO DE TAMANHOS */}
                {tela === 'opcoes' && (
                    <OpcaoMilkshake
                        onSelecionar={(valor) => setPrecoTamanho(valor)}
                        onProximo={() => mudarDeTela('caldas')}
                    />
                )}

                {/* TELA 4: SELEÇÃO DE CALDAS */}
                {tela === 'caldas' && (
                    <OpcaoCaldas
                        onSelecionar={(valor) => setPrecoCalda(valor)}
                        onVoltar={voltarParaTamanhos}
                        onProximo={() => mudarDeTela('sabores')}
                    />
                )}

                {/* TELA 5: SABORES */}
                {tela === 'sabores' && (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h2>Agora escolha o sabor!</h2>
                        <button onClick={voltarParaCaldas}>Voltar</button>
                    </div>
                )}

            </div>

            {/* BARRA DE TOTAL FIXA*/}
            {tela !== 'home' && tela !== 'loading' && (
                <BarraTotal valor={totalPedido} />
            )}

        </div>
    );
}

export default App;