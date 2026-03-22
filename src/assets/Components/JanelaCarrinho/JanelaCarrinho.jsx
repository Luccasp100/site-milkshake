import React from 'react';
import './JanelaCarrinho.css';

const JanelaCarrinho = ({ aberto, aoFechar, itens }) => {
    if (!aberto) return null;

    // Transformamos o objeto de escolhas em um array apenas com o que não é nulo
    const listaDeItens = Object.values(itens).filter(item => item !== null);

    return (
        <div className="carrinho-overlay" onClick={aoFechar}>
            {/* O stopPropagation impede que a janela feche ao clicar dentro do carrinho */}
            <div className="carrinho-lateral" onClick={(e) => e.stopPropagation()}>
                <div className="carrinho-header">
                    <h2>Pedidos</h2>
                    <button className="btn-fechar-x" onClick={aoFechar}>&times;</button>
                </div>

                <div className="carrinho-lista">
                    {listaDeItens.length === 0 ? (
                        <p className="carrinho-vazio">Nenhum item selecionado</p>
                    ) : (
                        listaDeItens.map((item, index) => (
                            <div key={index} className="carrinho-item-card">
                                <img src={item.imagem} alt={item.nome} className="img-carrinho" />
                                <div className="item-info">
                                    <span className="nome-carrinho">{item.nome}</span>
                                    <span className="preco-carrinho">R$ {item.preco.toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default JanelaCarrinho;