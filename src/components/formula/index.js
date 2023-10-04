import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { FloatingLabel, Form, Button } from 'react-bootstrap';

import SymbolSelector from './SymbolSelector';

import './style.css'

const MathInput = ({ setFormula, formula }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleExampleButtonClick = () => {
        setFormula('c = \\pm\\sqrt{a^2 + b^2}');
    }

    const handleInputFocus = () => {
        setShowMenu(true);
    }

    const handleSymbolSelect = (symbol) => {
        setFormula(formula + symbol);
        setShowMenu(false);
    }

    return (
        <div className="math-input">
            <div className="">
                <FloatingLabel controlId="floatingPassword" label="Formula média" className="me-2 mb-2">
                    <Form.Control
                        required
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                        type="text"
                        placeholder="Sua fórmula para média"
                        onFocus={handleInputFocus}
                    />
                </FloatingLabel>
                <div className="menu-Symbol">
                    {showMenu && <SymbolSelector onSelect={handleSymbolSelect} />}
                </div>
                <div className='add-subject-form d-flex align-items-center'>
                    <button id="example" onClick={handleExampleButtonClick}>Exemplo de Fórmula</button>
                    <BlockMath>{formula}</BlockMath>
                </div>
            </div>
        </div>
    );
};

export default MathInput;
