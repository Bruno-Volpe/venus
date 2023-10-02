import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { FloatingLabel, Form, Button } from 'react-bootstrap';

import './style.css'

const MathInput = () => {
    const [formula, setFormula] = useState('');

    const handleExampleButtonClick = () => {
        setFormula('c = \\pm\\sqrt{a^2 + b^2}');
    }

    return (
        <div className="math-input">
            <div className="">
                <FloatingLabel controlId="floatingPassword" label="Formula média" className="me-2">
                    <Form.Control
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                        type="text"
                        placeholder="Sua fórmula para média"
                    />
                </FloatingLabel>
                <div className='add-subject-form d-flex align-items-center'>
                    <button id="example" onClick={handleExampleButtonClick}>Exemplo de Fórmula</button>
                    <BlockMath>{formula}</BlockMath>
                </div>

            </div>
        </div>
    );
};

export default MathInput;
