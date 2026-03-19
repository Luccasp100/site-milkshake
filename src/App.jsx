import React, { useState } from 'react';
import Home from './assets/Pages/Home/Home';
import AnimacaoLiquido from './assets/Components/AnimacaoLiquido/AnimacaoLiquido';
import OpcaoMilkshake from './assets/Components/OpcaoMilkshake/OpcaoMilkShake';
import BarraTotal from './assets/Components/BarraPrecoTotal/BarraPrecoTotal';

function App() {
    // 1. ESTADO DE NAVEGAÇÃO
    const [tela, setTela] = useState('opcoes');

    // 2. ESTADO DO PEDIDO (Estado Global)
    const [totalPedido, setTotalPedido] = useState(0);

    // 3. FUNÇÃO DE ATUALIZAÇÃO
    const atualizarValorTotal = (novoValor) => {
        setTotalPedido(novoValor);
    };

    return (
        <div className="App">

            {/* TELA 1: HOME 
                O usuário clica em iniciar e mudamos para o loading */}
            {tela === 'home' && (
                <Home onIniciar={() => setTela('loading')} />
            )}

            {/* TELA 2: LOADING (Animação do líquido)*/}
            {tela === 'loading' && (
                <AnimacaoLiquido onFinalizado={() => setTela('opcoes')} />
            )}

            {/* TELA 3: SELEÇÃO DE OPÇÕES (Tamanhos)
                Passamos a função 'onSelecionar' para atualizar o total no App */}
            {tela === 'opcoes' && (
                <OpcaoMilkshake onSelecionar={(valor) => setTotalPedido(valor)} />
            )}

            {/* TELA 4: SABORES (Exemplo de próxima etapa)
                A barra de total continuará aparecendo aqui com o valor salvo */}
            {tela === 'sabores' && (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>Agora escolha o sabor!</h2>
                    <button onClick={() => setTela('opcoes')}>Voltar</button>
                </div>
            )}

            {/* BARRA DE TOTAL FIXA
                Ela só deve aparecer após o loading e se não estiver na home. */}
            {tela !== 'home' && tela !== 'loading' && (
                <BarraTotal valor={totalPedido} />
            )}

        </div>
    );
}

export default App;