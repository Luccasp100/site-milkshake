import React from 'react';
import './BarraPrecoTotal.css';

const BarraTotal = ({ valor }) => {
    return (
        <div className="barra-total-fixa">
            <div className="conteudo-barra">
                <span>Total: R$ {valor.toFixed(2).replace('.', ',')}</span>
            </div>
        </div>
    );
};

export default BarraTotal;