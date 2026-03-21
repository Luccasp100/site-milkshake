import React, { useState } from 'react';
import dados from '../../Data/DadosMilkShake.json';

const OpcaoAdicionais = ({ onSelecionar, onVoltar, onProximo }) => {
    const [adicionalSelecionado, setAdicionalSelecionado] = useState(null);

    const handleEscolha = (item) => {
        setAdicionalSelecionado(item);
        onSelecionar(item.preco); // para somar o valor no app
    };

    return (
        <div className="opcoes-container">
            <div className="area-voltar">
                <button className="btn-voltar-topo" onClick={onVoltar}>
                    <span className="seta">←</span> Voltar
                </button>
            </div>

            <h2 className="titulo-selecao">Selecione seus adicionais</h2>

            <div className="grid-opcoes">
                {dados.adicionais.map((item) => (
                    <div
                        key={item.id}
                        className={`card-opcao ${adicionalSelecionado?.id === item.id ? 'ativo' : ''}`}
                        onClick={() => handleEscolha(item)}
                    >
                        <div className="container-img">
                            <img src={item.imagem} alt={item.nome} className="img-opcao" />
                        </div>

                        <div className="info-txt">
                            <span className="txt-nome">{item.nome}</span>
                            <span className="txt-preco">
                                + R$ {item.preco.toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {adicionalSelecionado && (
                <button className="btn-proximo" onClick={onProximo}>
                    Confirmar Adicionais
                </button>
            )}
        </div>
    );
};

export default OpcaoAdicionais;