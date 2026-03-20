import React, { useState } from 'react';
import dados from '../../Data/DadosMilkShake.json'; 

const OpcaoMilkshake = ({ onSelecionar, onProximo }) => {
    const [itemSelecionado, setItemSelecionado] = useState(null);

    const handleEscolha = (item) => {
        setItemSelecionado(item); 
        onSelecionar(item.preco); 
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
                        <div className="container-img">
                            <img src={item.imagem} alt={item.nome} className="img-opcao" />
                        </div>

                        <div className="info-txt">
                            <span className="txt-nome">{item.nome}</span>
                            <span className="txt-preco">
                                R$ {item.preco.toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {itemSelecionado && (
                <button className="btn-proximo" onClick={onProximo}>
                    Confirmar Tamanho
                </button>
            )}
        </div>
    );
};

export default OpcaoMilkshake;