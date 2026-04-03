import React, { useState, useEffect } from 'react';
import dados from '../../Data/DadosMilkShake.json';

const OpcaoAdicionais = ({ onSelecionar, onVoltar, onProximo }) => {
    // 2. Começamos com um ARRAY vazio para armazenar as 3 escolhas
    const [selecionados, setSelecionados] = useState([]);

    // 3. Lógica para permitir repetição e limite global de 3
    const handleEscolha = (item) => {
        setSelecionados(prev => {
            let novaLista;
            
            // Verifica se o item já está na lista para lógica de remoção
            const jaSelecionado = prev.find(i => i.id === item.id);

            if (prev.length < 3) {
                // Se ainda não atingiu o limite de 3, adiciona o item (mesmo se for repetido)
                novaLista = [...prev, item];
            } else if (jaSelecionado) {
                // Se já tem 3 itens e clicou em um que já existe, remove todas as instâncias dele (limpa o card)
                novaLista = prev.filter(i => i.id !== item.id);
            } else {
                // Se já tem 3 e clicou em um novo, não faz nada (bloqueio)
                return prev;
            }

            // Avisa o App para atualizar o preço total instantaneamente
            onSelecionar(novaLista); 
            return novaLista;
        });
    };

    // Função auxiliar para contar a quantidade de cada item selecionado
    const obterQuantidade = (id) => {
        return selecionados.filter(item => item.id === id).length;
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
                {dados.adicionais && dados.adicionais.map((item) => {
                    const quantidade = obterQuantidade(item.id);
                    
                    return (
                        <div
                            key={item.id}
                            style={{ position: 'relative' }} // Garante que o contador fique posicionado no card
                            className={`card-opcao ${quantidade > 0 ? 'ativo' : ''}`}
                            onClick={() => handleEscolha(item)}
                        >
                            {/* CONTADOR VISUAL: Aparece apenas se houver 1 ou mais */}
                            {quantidade > 0 && (
                                <div className="contador-badge">{quantidade}x</div>
                            )}

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
                    );
                })}
            </div>

            {/* 5. Feedback visual no botão de Confirmação */}
            {selecionados.length > 0 && (
                <button className="btn-proximo" onClick={onProximo}>
                    Confirmar ({selecionados.length}/3) Itens
                </button>
            )}
        </div>
    );
};

export default OpcaoAdicionais;