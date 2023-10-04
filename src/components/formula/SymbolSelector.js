import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const SymbolSelector = ({ onSelect }) => {
    const symbols = ['\\alpha', '\\beta', '\\gamma', '\\delta', '\\sqrt{x}'];

    const handleSymbolClick = (symbol) => {
        onSelect(symbol);
    }

    return (
        <div className="symbol-selector">
            {symbols.map((symbol, index) => (
                <button key={index} onClick={() => handleSymbolClick(symbol)}>
                    <BlockMath>{symbol}</BlockMath>
                </button>
            ))}
        </div>
    );
};

export default SymbolSelector;
