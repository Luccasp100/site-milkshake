import React from 'react';
import './Home.css';

const Home = ({ onIniciar }) => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Milkshake Express</h1>
                <p>Monte o seu shake perfeito em poucos segundos.</p>
                <button className="btn-começar" onClick={onIniciar}>
                    Montar meu Pedido
                </button>
            </div>
        </div>
    );
};

export default Home;