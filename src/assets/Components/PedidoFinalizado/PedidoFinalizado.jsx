import React, { useState } from 'react';
import './PedidoFinalizado.css';

const PedidoFinalizado = ({ escolhas, total, aoVoltarHome, aoReiniciarMilkshake }) => {
    // Estado para controlar a exibição da mensagem de erro
    const [mostrarErro, setMostrarErro] = useState(false);

    const itensSelecionados = Object.values(escolhas).filter(item => item !== null);

    return (
        <div className="finalizar-container">
            <h1 className="titulo-finalizar">Pedido completo</h1>

            <div className="resumo-pedido">
                {itensSelecionados.map((item, index) => (
                    <div key={index} className="card-item-final">
                        <img src={item.imagem} alt={item.nome} className="img-final" />
                        <span className="nome-final">{item.nome}</span>
                        <span className="preco-final">
                            {item.preco > 0 ? `+ R$ ${item.preco.toFixed(2).replace('.', ',')}` : `R$ ${item.preco.toFixed(2).replace('.', ',')}`}
                        </span>
                    </div>
                ))}
            </div>

            <div className="total-finalizar">
                <span>Total: </span>
                <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
            </div>

            <div className="acoes-botoes">
                <button className="btn-final btn-secundario" onClick={aoVoltarHome}>
                    Voltar a página inicial
                </button>

                <button className="btn-final btn-secundario" onClick={aoReiniciarMilkshake}>
                    Voltar a opções
                </button>

                <div className="container-pagamento">
                    <button
                        className="btn-final btn-destaque"
                        onClick={() => setMostrarErro(true)}
                    >
                        Pagamento
                    </button>

                    {mostrarErro && (
                        <p className="msg-erro-pagamento">não é possivel comprar :(</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PedidoFinalizado;