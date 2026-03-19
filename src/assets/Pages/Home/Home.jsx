import React from 'react';
import './Home.css';

const Home = ({ onIniciar }) => {
  return (
    <div className="home-container">
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Bem-vindo ao Milkshake Mania</h1>
        <p>Role para baixo para criar o seu!</p>
      </section>

      <section style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'top' }}>
        {/* O clique aqui muda o estado no App.jsx para 'transicao' */}
        <button 
          onClick={onIniciar}
          style={{ padding: '20px 40px', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '50px', border: 'none', background: '#f27a7a', color: 'white' }}
        >
          Montar meu Milkshake 🥤
        </button>
      </section>
    </div>
  );
};

export default Home;