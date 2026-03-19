import React, { useState } from 'react';
import './OpcaoMilkshake.css';
import dados from '../../Data/DadosMilkShake.json'; 

// Adicione o 'onProximo' aqui nas props
const OpcaoMilkshake = ({ onSelecionar, onProximo }) => {
    const [itemSelecionado, setItemSelecionado] = useState(null);

    const handleEscolha = (item) => {
        setItemSelecionado(item); 
        onSelecionar(item.preco); 
        
        // OPÇÃO A: Mudar de tela instantaneamente ao clicar no copo
        // onProximo(); 
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

            {/* OPÇÃO B: Botão de confirmar (Mais seguro para o usuário não errar) */}
            {itemSelecionado && (
                <button className="btn-proximo" onClick={onProximo}>
                    Confirmar Tamanho
                </button>
            )}
        </div>
    );
};

export default OpcaoMilkshake;