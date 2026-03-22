import React from 'react';
import './JanelaCarrinho.css';

const JanelaCarrinho = ({ aberto, aoFechar, itens, total }) => {
    // 1. Se não estiver aberto, não faz nada
    if (!aberto) return null;

    // 2. Segurança: Garante que 'itens' seja um objeto e filtra nulos
    const listaDeItens = itens 
        ? Object.values(itens).filter(item => item !== null) 
        : [];

    // 3. LOGICA DE SOMA: Se o 'total' passado for 0 mas houver itens, ele soma aqui
    // Isso evita que apareça R$ 0,00 se houver erro na prop
    const valorParaExibir = total > 0 
        ? total 
        : listaDeItens.reduce((acc, item) => acc + (item.preco || 0), 0);

    const totalFormatado = (Number(valorParaExibir) || 0).toFixed(2).replace('.', ',');

    return (
        <div className="carrinho-overlay" onClick={aoFechar}>
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
                                <img src={item?.imagem} alt={item?.nome} className="img-carrinho" />
                                <div className="item-info">
                                    <span className="nome-carrinho">{item?.nome}</span>
                                    <span className="preco-carrinho">
                                        R$ {(item?.preco || 0).toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Renderização Condicional: Só exibe o footer se houver itens no pedido */}
                {listaDeItens.length > 0 && (
                    <div className="carrinho-footer">
                        <div className="barra-total-carrinho">
                            <span className="label-total">TOTAL DO SEU PEDIDO:</span>
                            <span className="valor-total">R$ {totalFormatado}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JanelaCarrinho;