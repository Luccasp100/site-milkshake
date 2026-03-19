import React, { useState } from 'react';
import Home from './assets/Pages/Home/Home';
import AnimacaoLiquido from './assets/Components/AnimacaoLiquido/AnimacaoLiquido';
import OpcaoMilkshake from './assets/Components/OpcaoMilkshake/OpcaoMilkShake';
import OpcaoCaldas from './assets/Components/OpcaoCaldas/OpcaoCaldas'; // Nova tela
import BarraTotal from './assets/Components/BarraPrecoTotal/BarraPrecoTotal';

function App() {
    // 1. ESTADO DE NAVEGAÇÃO
    // Mantive 'opcoes' para você continuar focado no desenvolvimento
    const [tela, setTela] = useState('opcoes');

    // 2. ESTADOS DO PEDIDO (Estado Global)
    // Separamos os preços para a soma ser precisa e permitir o "Voltar"
    const [precoTamanho, setPrecoTamanho] = useState(0);
    const [precoCalda, setPrecoCalda] = useState(0);

    // O totalPedido agora é uma constante que soma os estados em tempo real
    const totalPedido = precoTamanho + precoCalda;

    // --- FUNÇÕES DE NAVEGAÇÃO COM RESET ---
    
    // Função para voltar das caldas resetando o valor selecionado anteriormente
    const voltarParaTamanhos = () => {
        setPrecoCalda(0); // Zera o valor da calda para não bugar o total
        setTela('opcoes');
    };

    // Função para voltar dos sabores resetando o valor da calda
    const voltarParaCaldas = () => {
        // Se quiser resetar algo ao voltar dos sabores, pode adicionar aqui
        setTela('caldas');
    };

    return (
        <div className="App">

            {/* TELA 1: HOME 
                O usuário clica em iniciar e mudamos para o loading */}
            {tela === 'home' && (
                <Home onIniciar={() => setTela('loading')} />
            )}

            {/* TELA 2: LOADING (Animação do líquido)
                Quando o líquido termina de descer (onFinalizado), mudamos para 'opcoes' */}
            {tela === 'loading' && (
                <AnimacaoLiquido onFinalizado={() => setTela('opcoes')} />
            )}

            {/* TELA 3: SELEÇÃO DE TAMANHOS
                Atualiza apenas o 'precoTamanho' e permite ir para a próxima tela */}
            {tela === 'opcoes' && (
                <OpcaoMilkshake 
                    onSelecionar={(valor) => setPrecoTamanho(valor)} 
                    onProximo={() => setTela('caldas')}
                />
            )}

            {/* TELA 4: SELEÇÃO DE CALDAS
                Atualiza o 'precoCalda' e permite voltar para os tamanhos resetando o valor */}
            {tela === 'caldas' && (
                <OpcaoCaldas 
                    onSelecionar={(valor) => setPrecoCalda(valor)} 
                    onVoltar={voltarParaTamanhos} // Chama a função de reset
                    onProximo={() => setTela('sabores')}
                />
            )}

            {/* TELA 5: SABORES (Próxima etapa) */}
            {tela === 'sabores' && (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>Agora escolha o sabor!</h2>
                    <button onClick={voltarParaCaldas}>Voltar</button>
                </div>
            )}

            {/* BARRA DE TOTAL FIXA
                Ela monitora a constante 'totalPedido' (Soma de Tamanho + Calda).
                Só aparece após o loading e se não estiver na home. */}
            {tela !== 'home' && tela !== 'loading' && (
                <BarraTotal valor={totalPedido} />
            )}

        </div>
    );
}

export default App;