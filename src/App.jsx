import React, { useState } from 'react';
import Home from './assets/Pages/Home/Home';
import AnimacaoLiquido from './assets/Components/AnimacaoLiquido/AnimacaoLiquido';
import OpcaoMilkshake from './assets/Components/OpcaoTamanhoMilkshake/OpcaoTamanhoMilkShake';
import OpcaoCaldas from './assets/Components/OpcaoAdicionais/OpcaoAdicionais';
import BarraTotal from './assets/Components/BarraPrecoTotal/BarraPrecoTotal';
import './assets/Components/CssGlobal/OpcoesGlobais.css'; //estilo global da customização dos milkshakes
import OpcaoSabores from './assets/Components/OpcaoSabores/OpcaoSabores';

function App() {
    // 1. ESTADOS DE NAVEGAÇÃO E ANIMAÇÃO
    const [tela, setTela] = useState('opcoes');
    const [animando, setAnimando] = useState(false); // Controla se a classe fade-out está ativa

    // NOVO ESTADO: Controla se a animação do líquido está cobrindo a tela atual
    const [exibirLoading, setExibirLoading] = useState(false);

    // 2. ESTADOS DO PEDIDO (Preços acumulados)
    const [precoTamanho, setPrecoTamanho] = useState(0);
    const [precoCalda, setPrecoCalda] = useState(0);
    const [precoSabor, setPrecoSabor] = useState(0);

    // Soma total calculada em tempo real
    const totalPedido = precoTamanho + precoCalda + precoSabor;

    // 3. LOGICA DE FILTRO DE ANIMAÇÃO
    // Criamos uma lista das telas que DEVEM ter o efeito de fade
    const telasComAnimacao = ['opcoes', 'caldas', 'sabores'];

    // Verificamos se a tela atual está na nossa lista de animação
    const deveAnimar = telasComAnimacao.includes(tela);

    // --- FUNÇÕES DE TRANSIÇÃO ---
    const mudarDeTela = (novaTela, acaoExtra = () => { }) => {
        // Só aplicamos o delay de animação se estivermos navegando entre telas de opções
        if (telasComAnimacao.includes(tela) || telasComAnimacao.includes(novaTela)) {
            setAnimando(true); // Inicia o Fade Out

            setTimeout(() => {
                acaoExtra(); // Executa limpezas de estado (ex: zerar calda)
                setTela(novaTela); // Troca a tela no "escuro" (opacity 0)
                setAnimando(false); // Inicia o Fade In
            }, 300);
        } else {
            // Caso especial: Home -> Opções via Loading
            acaoExtra();
            setTela(novaTela);
        }
    };

    // --- ATALHOS DE NAVEGAÇÃO ---
    const voltarParaTamanhos = () => mudarDeTela('opcoes', () => setPrecoSabor(0));
    const voltarParaSabores = () => mudarDeTela('sabores', () => setPrecoCalda(0));
    const voltarParaCaldas = () => mudarDeTela('caldas');

    return (
        <div className="App">

            {/* TELA 1: HOME */}
            {tela === 'home' && (
                <div style={{ position: 'relative' }}>
                    <Home onIniciar={() => {
                        setExibirLoading(true); // 1. O líquido começa a cair (Home ainda está no fundo)

                        // 2. AGUARDAMOS O LÍQUIDO COBRIR A TELA
                        setTimeout(() => {
                            setTela('opcoes'); // 3. ocorre a troca de telas
                        }, 10000); //tempo para trocar a tela 
                    }} />
                </div>
            )}

            {/* OVERLAY DE LOADING: Fica visível até a animação terminar por completo */}
            {exibirLoading && (
                <div className="overlay-loading">
                    <AnimacaoLiquido onFinalizado={() => {
                        // 4. Quando o líquido sumir de vez, a tela 'opcoes' já estará lá!
                        setExibirLoading(false);
                    }} />
                </div>
            )}

            {/* O container abaixo só aparece quando tela for 'opcoes', 'caldas' ou 'sabores' */}
            <div className={deveAnimar ? (animando ? 'fade-out' : 'fade-in') : ''}>

                {/* TELA 3: SELEÇÃO DE TAMANHOS */}
                {tela === 'opcoes' && (
                    <OpcaoMilkshake
                        onSelecionar={(valor) => setPrecoTamanho(valor)}
                        onProximo={() => mudarDeTela('sabores')}
                    />
                )}

                {/* TELA 4: SELEÇÃO DE SABORES */}
                {tela === 'sabores' && (
                    <OpcaoSabores
                        onSelecionar={(valor) => setPrecoSabor(valor)} 
                        onVoltar={voltarParaTamanhos}
                        onProximo={() => mudarDeTela('caldas')}
                    />
                )}

                {/* TELA 5: SELEÇÃO DE ADICIONAIS */}
                {tela === 'caldas' && (
                    <OpcaoCaldas
                        onSelecionar={(valor) => setPrecoCalda(valor)}
                        onVoltar={voltarParaSabores}
                        onProximo={() => mudarDeTela('finalizacao')}
                    />
                )}
                {/* TELA 6: FINALIZAÇÃO */}
                {tela === 'sabores' && (
                    <OpcaoSabores
                        onSelecionar={(valor) => setPrecoSabor(valor)}
                        onVoltar={voltarParaTamanhos}
                        onProximo={() => mudarDeTela('caldas')}
                    />
                )}

            </div>

            {/* BARRA DE TOTAL FIXA */}
            {tela !== 'home' && (
                <BarraTotal valor={totalPedido} />
            )}

        </div>
    );
}

export default App;