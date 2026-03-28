import React, { useState, useEffect } from 'react';
import dados from '../../Data/DadosMilkShake.json';

const OpcaoAdicionais = ({ onSelecionar, onVoltar, onProximo }) => {
    // 2. Começamos com um ARRAY vazio para armazenar as 3 escolhas
    const [selecionados, setSelecionados] = useState([]);

    // 3. Lógica para toggle (liga/desliga) e limite de 3
    const handleEscolha = (item) => {
        setSelecionados(prev => {
            const jaSelecionado = prev.find(i => i.id === item.id);
            let novaLista;

            if (jaSelecionado) {
                // Se já clicou, remove da lista (desmarcar)
                novaLista = prev.filter(i => i.id !== item.id);
            } else if (prev.length < 3) {
                // Se não está na lista e tem menos de 3, adiciona
                novaLista = [...prev, item];
            } else {
                // Se já tem 3, não faz nada (bloqueio)
                return prev;
            }

            // Avisa o App para atualizar o preço total instantaneamente
            onSelecionar(novaLista); 
            return novaLista;
        });
    };

    return (
        <div className="opcoes-container">
            <div className="area-voltar">
                <button className="btn-voltar-topo" onClick={onVoltar}>
                    <span className="seta">←</span> Voltar
                </button>
            </div>

            <h2 className="titulo-selecao">Selecione até 3 adicionais</h2>

            {/* 4. ESTRUTURA PARA APARECER: mapeia o array do JSON */}
            <div className="grid-opcoes">
                {dados.adicionais && dados.adicionais.map((item) => (
                    <div
                        key={item.id}
                        // Verifica se o ID do item está dentro do array de selecionados
                        className={`card-opcao ${selecionados.some(i => i.id === item.id) ? 'ativo' : ''}`}
                        onClick={() => handleEscolha(item)}
                    >
                        <div className="container-img">
                            {/* Verifique se a URL da imagem no JSON está correta */}
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

            {/* 5. Feedback visual no botão de Confirmação */}
            {selecionados.length > 0 && (
                <button className="btn-proximo" onClick={onProximo}>
                    Confirmar ({selecionados.length}/3) Adicionais
                </button>
            )}
        </div>
    );
};

export default OpcaoAdicionais;