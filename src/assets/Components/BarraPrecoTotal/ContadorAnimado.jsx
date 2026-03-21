import React, { useState, useEffect } from 'react';

const ContadorAnimado = ({ valor }) => {
    const [exibido, setExibido] = useState(valor);

    useEffect(() => {
        let start = exibido;
        const end = valor;
        if (start === end) return;

        // Duração da animação em milissegundos
        const duracao = 400; 
        const incremento = (end - start) / (duracao / 16); // 16ms é aprox. 1 frame

        const timer = setInterval(() => {
            start += incremento;
            // Verifica se passou do ponto para evitar loops infinitos
            if ((incremento > 0 && start >= end) || (incremento < 0 && start <= end)) {
                setExibido(end);
                clearInterval(timer);
            } else {
                setExibido(start);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [valor]);

    return (
        <span>
            R$ {exibido.toFixed(2).replace('.', ',')}
        </span>
    );
};

export default ContadorAnimado;