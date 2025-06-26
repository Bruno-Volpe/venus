import React from 'react';
import PropTypes from 'prop-types';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { FloatingLabel, Form, Row, Col, Button } from 'react-bootstrap';

import './style.css'

const MathInput = ({ setFormula, formula }) => {
    const handleExample = (e) => {
        e.preventDefault();
        setFormula('(n1 + n2) / 2');
    }

    return (
        <div className="math-input">
            <div className="">
                <FloatingLabel controlId="floatingPassword" label="Formula média" className="mb-2">
                    <Form.Control
                        required
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                        type="text"
                        placeholder="Sua fórmula para média"
                    />
                </FloatingLabel>
                <Row className="d-flex align-items-center justify-content-center">
                    <Col xs={12} className="text-center d-flex justify-content-center align-items-center">
                        <div className="menu-Symbol">
                            <small>Coloque n(x) para p(x)</small>
                            <Button onClick={e => handleExample(e)} id="exemplo-botao">Exemplo</Button>
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

// Validação de props
MathInput.propTypes = {
    setFormula: PropTypes.func.isRequired,
    formula: PropTypes.string.isRequired
};

export default MathInput;
