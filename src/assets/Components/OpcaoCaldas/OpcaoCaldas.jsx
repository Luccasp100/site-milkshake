import React, { useState } from 'react';
import '../OpcaoMilkshake/OpcaoMilkShake.css';
import dados from '../../Data/DadosMilkShake.json'; 

const OpcaoCaldas = ({ onSelecionar, onVoltar }) => {
    const [caldaSelecionada, setCaldaSelecionada] = useState(null);

    const handleEscolha = (item) => {
        setCaldaSelecionada(item);
        onSelecionar(item.preco); // Envia o preço da calda para somar no App
    };

    return (
        <div className="opcoes-container">
            <h2 className="titulo-selecao">Selecione o tipo de calda</h2>

            <div className="grid-opcoes">
                {dados.caldas.map((item) => (
                    <div 
                        key={item.id} 
                        className={`card-opcao ${caldaSelecionada?.id === item.id ? 'ativo' : ''}`}
                        onClick={() => handleEscolha(item)}
                    >
                        {/* Quadrado bege/marrom conforme seu novo print */}
                        <div className="quadrado-azul" style={{ backgroundColor: '#EBCFB2' }}></div>
                        
                        <div className="info-txt">
                            <span className="txt-nome">{item.nome}</span>
                            <span className="txt-preco">R$ {item.preco.toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="botoes-navegacao">
                <button className="btn-voltar" onClick={onVoltar}>Voltar</button>
                {caldaSelecionada && <button className="btn-proximo">Finalizar Pedido</button>}
            </div>
        </div>
    );
};

export default OpcaoCaldas;