import React, { useState } from 'react';
import Home from './assets/Pages/Home/Home';
import AnimacaoLiquido from './assets/Components/AnimacaoLiquido/AnimacaoLiquido';
import OpcaoMilkshake from './assets/Components/OpcaoTamanho/OpcaoTamanho';
import OpcaoAdicionais from './assets/Components/OpcaoAdicionais/OpcaoAdicionais';
import BarraTotal from './assets/Components/BarraPrecoTotal/BarraPrecoTotal';
import './assets/Components/CssGlobal/OpcoesGlobais.css'; //estilo global da customização dos milkshakes
import OpcaoSabores from './assets/Components/OpcaoSabores/OpcaoSabores';
import JanelaCarrinho from './assets/Components/JanelaCarrinho/JanelaCarrinho';
import PedidoFinalizado from './assets/Components/PedidoFinalizado/PedidoFinalizado';
import Footer from './assets/Layout/Footer/Footer';

function App() {
    // 1. ESTADOS DE NAVEGAÇÃO E ANIMAÇÃO
    const [tela, setTela] = useState('home'); // tela de inicio home/opcoes
    const [animando, setAnimando] = useState(false); // Controla se a classe fade-out está ativa
    // Controla se a animação do líquido está cobrindo a tela atual
    const [exibirLoading, setExibirLoading] = useState(false);

    // ESTADO DO CARRINHO: Controla se a janela lateral de pedidos está aberta
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);

    // 2. ESTADOS DO PEDIDO (Preços acumulados)
    // Inicializamos sempre com 0 para evitar o erro NaN
    const [precoTamanho, setPrecoTamanho] = useState(0);
    const [precoAdicional, setPrecoAdicional] = useState(0);
    const [precoSabor, setPrecoSabor] = useState(0);

    // ESTADO DAS ESCOLHAS: Armazena os dados completos para o carrinho lateral
    const [escolhas, setEscolhas] = useState({
        tamanho: null,
        sabor: null,
        adicional: null
    });

    // Se precoTamanho for undefined ou null, ele usa 0.
    // CÁLCULO DO TOTAL: Sempre atualizado com base nos estados de preço
    const totalPedido = (Number(precoTamanho) || 0) + (Number(precoAdicional) || 0) + (Number(precoSabor) || 0);

    // --- FUNÇÃO DE RESET (Limpa tudo para um novo pedido) ---
    const resetarTudo = () => {
        setPrecoTamanho(0);
        setPrecoSabor(0);
        setPrecoAdicional(0);
        setEscolhas({
            tamanho: null,
            sabor: null,
            adicional: null
        });
    };

    // 3. LOGICA DE FILTRO DE ANIMAÇÃO
    //lista das telas que DEVEM ter o efeito de fade
    const telasComAnimacao = ['opcoes', 'adicionais', 'sabores'];
    const deveAnimar = telasComAnimacao.includes(tela);

    // --- FUNÇÕES DE TRANSIÇÃO ---
    const mudarDeTela = (novaTela, acaoExtra = () => { }) => {
        if (telasComAnimacao.includes(tela) || telasComAnimacao.includes(novaTela)) {
            setAnimando(true); // Inicia o Fade Out

            setTimeout(() => {
                acaoExtra(); // Executa limpezas de estado (ex: zerar adicional)
                setTela(novaTela); // Troca a tela no "escuro" (opacity 0)
                setAnimando(false); // Inicia o Fade In
            }, 300);
        } else {
            acaoExtra();
            setTela(novaTela);
        }
    };

    // Função auxiliar para salvar o item selecionado (nome, preco, imagem) no carrinho
    const atualizarEscolha = (categoria, item) => {
        setEscolhas(prev => ({ ...prev, [categoria]: item }));
    };

    // --- ATALHOS DE NAVEGAÇÃO ---
    const aoVoltarHome = () => {
        resetarTudo(); // Garante que ao voltar para a home, o valor zere
        setTela('home');
    };

    const voltarParaTamanhos = () => mudarDeTela('opcoes', () => {
        setPrecoSabor(0);
        atualizarEscolha('sabor', null);
    });

    const voltarParaSabores = () => mudarDeTela('sabores', () => {
        setPrecoAdicional(0);
        atualizarEscolha('adicional', null);
    });

    return (
        <div className="App">

            {/* TELA 1: HOME */}
            {tela === 'home' && (
                <div style={{ position: 'relative' }}>
                    <Home onIniciar={() => {
                        setExibirLoading(true); // 1. O líquido começa a cair

                        // 2. AGUARDAMOS O LÍQUIDO COBRIR A TELA
                        setTimeout(() => {
                            setTela('opcoes'); // 3. ocorre a troca de telas
                        }, 9805); // tempo para aparecer a proxíma tela 
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

            {/* O container abaixo só aparece quando tela for 'opcoes', 'adicionais' ou 'sabores' */}
            <div className={deveAnimar ? (animando ? 'fade-out' : 'fade-in') : ''}>

                {/* TELA 3: SELEÇÃO DE TAMANHOS */}
                {tela === 'opcoes' && (
                    <OpcaoMilkshake
                        onSelecionar={(item) => {
                            // Verificação de segurança: só atualiza se o item tiver preço
                            const valor = item?.preco ?? 0;
                            setPrecoTamanho(valor);
                            atualizarEscolha('tamanho', item);
                        }}
                        onProximo={() => mudarDeTela('sabores')}
                    />
                )}

                {/* TELA 4: SELEÇÃO DE SABORES */}
                {tela === 'sabores' && (
                    <OpcaoSabores
                        onSelecionar={(item) => {
                            const valor = item?.preco ?? 0;
                            setPrecoSabor(valor);
                            atualizarEscolha('sabor', item);
                        }}
                        onVoltar={voltarParaTamanhos}
                        onProximo={() => mudarDeTela('adicionais')}
                    />
                )}

                {/* TELA 5: SELEÇÃO DE ADICIONAIS */}
                {tela === 'adicionais' && (
                    <OpcaoAdicionais
                        onSelecionar={(item) => {
                            const valor = item?.preco ?? 0;
                            setPrecoAdicional(valor);
                            atualizarEscolha('adicional', item);
                        }}
                        onVoltar={voltarParaSabores}
                        onProximo={() => mudarDeTela('resumo')}
                    />
                )}

                {/* TELA 6: FINALIZAÇÃO */}
                {tela === 'resumo' && (
                    <PedidoFinalizado
                        escolhas={escolhas}
                        total={totalPedido} // Use totalPedido que é sua soma real
                        aoVoltarHome={aoVoltarHome} // Usa a função com reset
                        aoReiniciarMilkshake={() => {
                            resetarTudo(); // Zera os valores para a nova escolha
                            mudarDeTela('opcoes');
                        }}
                    />
                )}

            </div>

            {/* BARRA DE TOTAL FIXA - some na home e no resumo */}
            {tela !== 'home' && tela !== 'resumo' && (
                <BarraTotal
                    valor={totalPedido}
                    aoAbrirCarrinho={() => setCarrinhoAberto(true)}
                />
            )}

            {/* JANELA LATERAL DE PEDIDOS (CARRINHO) */}
            <JanelaCarrinho
                aberto={carrinhoAberto}
                aoFechar={() => setCarrinhoAberto(false)}
                itens={escolhas}
                total={totalPedido} 
            />
            {/* Lógica para esconder o Footer: */}
            {/* Ele só será renderizado se a tela for DIFERENTE de 'resumo' */}
            {tela !== 'resumo' && <Footer telaAtual={tela} />}

        </div>
    );
}

export default App;