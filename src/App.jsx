import { useState } from 'react';

// Importação das Páginas
import Home from './assets/Pages/Home/Home';
// Importação do Componente de Animação
import AnimacaoLiquido from './assets/Components/AnimacaoLiquido/AnimacaoLiquido'

function App() {
  /**
   * Estados possíveis:
   * 'home' - Mostra a página inicial
   * 'transicao' - Mostra o líquido preenchendo a tela
   * 'opcoes' - Mostra a tela de montagem do milkshake
   */
  const [etapa, setEtapa] = useState('home');

  return (
    <div className="App">
      
      {/* 1. TELA PRINCIPAL (Home) */}
      {etapa === 'home' && (
        <Home onIniciar={() => setEtapa('transicao')} />
      )}

      {/* 2. ANIMAÇÃO DE CARREGAMENTO (Líquido) */}
      {etapa === 'transicao' && (
        <AnimacaoLiquido onFinalizado={() => setEtapa('opcoes')} />
      )}

      {/* 3. TELA DE OPÇÕES (Montar Milkshake) */}
      {etapa === 'opcoes' && (
        <div className="tela-opcoes">
          {/* Aqui entrará seu componente de montagem futuramente */}
          <h1>Escolha suas opções</h1>
          <button onClick={() => setEtapa('home')}>Voltar ao Início</button>
        </div>
      )}

    </div>
  );
}

export default App;