import React from 'react';
import ContadorAnimado from './ContadorAnimado';
import './BarraPrecoTotal.css';

const BarraTotal = ({ valor, aoAbrirCarrinho }) => { 
    return (
        <div className="barra-total-fixa">
            <div className="conteudo-barra">
                <div className="textos">
                    <span className="label">Total do seu pedido:</span>
                    <div className="valor-dinamico">
                        <ContadorAnimado valor={valor} />
                    </div>
                </div>
                
                <button className="btn-carrinho-icone" onClick={aoAbrirCarrinho}>
                    <img src="/image/ShoppingCart.svg" alt="Carrinho" />
                </button>
            </div>
        </div>
    );
};

export default BarraTotal;