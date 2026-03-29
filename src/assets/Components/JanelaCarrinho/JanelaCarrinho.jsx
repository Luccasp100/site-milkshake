import React, { useEffect } from 'react';
import './JanelaCarrinho.css';

const JanelaCarrinho = ({ aberto, aoFechar, itens, total }) => {

    useEffect(() => {
        if (aberto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [aberto]);
    
    if (!aberto) return null;

    // 1. Pega tamanho e sabor normalmente
    const basicos = [itens.tamanho, itens.sabor].filter(item => item !== null);
    
    // 2. Pega a lista de adicionais (garantindo que seja um array)
    const adicionais = Array.isArray(itens.adicional) ? itens.adicional : [];
    
    // 3. Junta tudo em uma lista única e limpa para o .map()
    const listaDeItens = [...basicos, ...adicionais];

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

            <div className="carrinho-lista carrinho-lista-scroll">
                {listaDeItens.length === 0 ? (
                    <p className="carrinho-vazio">Nenhum item selecionado</p>
                ) : (
                    <div className="carrinho-lista-container"> 
                        {listaDeItens.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* Rótulos para organizar o pedido */}
                                {index === 0 && <p className="rotulo-categoria">Copo:</p>}
                                {index === 1 && <p className="rotulo-categoria">Sabor:</p>}
                                {index === 2 && <p className="rotulo-categoria">Adicionais:</p>}

                                <div className="carrinho-item-card">
                                    <img src={item?.imagem} alt={item?.nome} className="img-carrinho" />
                                    <div className="item-info">
                                        <span className="nome-carrinho">{item?.nome}</span>
                                        <span className="preco-carrinho">
                                            R$ {(item?.preco || 0).toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>     
                )}
            </div>

            {/* O footer rosa fica fixo na base se houver itens */}
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