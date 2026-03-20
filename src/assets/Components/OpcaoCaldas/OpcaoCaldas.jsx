import React, { useState } from 'react';
import dados from '../../Data/DadosMilkShake.json';

const OpcaoCaldas = ({ onSelecionar, onVoltar, onProximo }) => {
    // Estado para controlar qual calda está com a borda de seleção
    const [caldaSelecionada, setCaldaSelecionada] = useState(null);

    const handleEscolha = (item) => {
        setCaldaSelecionada(item);
        onSelecionar(item.preco); // Avisa o App.jsx para somar o valor
    };

    return (
        <div className="opcoes-container">
            <div className="area-voltar">
                <button className="btn-voltar-topo" onClick={onVoltar}>
                    <span className="seta">←</span> Voltar
                </button>
            </div>

            <h2 className="titulo-selecao">Selecione o tipo de calda</h2>

            <div className="grid-opcoes">
                {/* MAPEAMENTO DAS CALDAS DO JSON COM IMAGEM DINÂMICA */}
                {dados.caldas.map((item) => (
                    <div
                        key={item.id}
                        className={`card-opcao ${caldaSelecionada?.id === item.id ? 'ativo' : ''}`}
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

            {/* BOTÃO PRÓXIMO (Só aparece se houver seleção) */}
            {caldaSelecionada && (
                <button className="btn-proximo" onClick={onProximo}>
                    Confirmar Calda
                </button>
            )}
        </div>
    );
};

export default OpcaoCaldas;