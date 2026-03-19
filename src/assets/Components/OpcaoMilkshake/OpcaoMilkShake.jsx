import React, { useState } from 'react';
import './OpcaoMilkshake.css';
import dados from '../../Data/DadosMilkShake.json'; 

const OpcaoMilkshake = ({ onSelecionar }) => {
    // Estado local apenas para saber qual card mostrar como "ativo" (com a borda rosa)
    const [itemSelecionado, setItemSelecionado] = useState(null);

    // Função que gerencia o clique
    const handleEscolha = (item) => {
        setItemSelecionado(item); // Marca visualmente o card
        onSelecionar(item.preco); // Avisa o App.jsx para atualizar a BarraTotal global
    };

    return (
        <div className="opcoes-container">
            <h2 className="titulo-selecao">Selecione o tamanho do copo</h2>

            <div className="grid-opcoes">
                {dados.tamanhos.map((item) => (
                    <div 
                        key={item.id} 
                        className={`card-opcao ${itemSelecionado?.id === item.id ? 'ativo' : ''}`}
                        onClick={() => handleEscolha(item)}
                    >
                        <div className="quadrado-azul"></div>
                        
                        <div className="info-txt">
                            <span className="txt-nome">{item.nome}</span>
                            <span className="txt-preco">
                                R$ {item.preco.toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpcaoMilkshake;