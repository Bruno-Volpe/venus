import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { FloatingLabel, Form, Row, Col } from 'react-bootstrap';

import SymbolSelector from './SymbolSelector';

import './style.css'

const MathInput = ({ setFormula, formula }) => {
    const handleSymbolSelect = (symbol) => {
        setFormula(formula + symbol);
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
                    />
                </FloatingLabel>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col xs={12} className="text-center">
                        <div className="menu-Symbol">
                            <SymbolSelector onSelect={handleSymbolSelect} />
                        </div>
                    </Col>
                    <Col xs={12} className="text-center">
                        <div>
                            <BlockMath>{formula}</BlockMath>
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
    );
};

export default MathInput;
