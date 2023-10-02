import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './style.css';

function FormFloatingBasicExample() {
    const [quantidadeProvas, setQuantidadeProvas] = useState(1);
    const [notas, setNotas] = useState([]);
    const [canSubmit, setCanSubmit] = useState('disabled');
    const [formula, setFormula] = useState('');

    const handleNotaChange = (index, value) => {
        const newNotas = [...notas];
        newNotas[index] = value;
        setNotas(newNotas);

        if (newNotas.every(nota => nota !== '' && quantidadeProvas > 0 && formula !== '')) {
            setCanSubmit('');
        } else { }
    }

    const renderInputs = () => {
        const inputs = [];
        for (let i = 0; i < quantidadeProvas; i++) {
            inputs.push(
                <Col key={i} sm={6} md={4} lg={3} className="d-inline-block mb-3">
                    <FloatingLabel controlId={`floatingInput${i}`} label={`P ${i + 1}`}>
                        <Form.Control
                            type="number"
                            placeholder={`Nota da prova ${i + 1}`}
                            value={notas[i] || ''}
                            onChange={(e) => handleNotaChange(i, e.target.value)}
                        />
                    </FloatingLabel>
                </Col>
            );
        }
        return inputs;
    }

    return (
        <>
            <Row className="mx-auto">
                <Col className="d-inline-block mb-3 mx-auto" sm={12} md={6}>
                    <FloatingLabel controlId="floatingInput" label="Quantidade de provas">
                        <Form.Control value={quantidadeProvas} onChange={e => setQuantidadeProvas(e.target.value)} type="number" placeholder="Sua quantidade de prova" />
                    </FloatingLabel>
                </Col>
                <Col className="d-inline-block mx-auto" sm={12} md={6}>
                    <FloatingLabel controlId="floatingPassword" label="Formula média">
                        <Form.Control value={formula} onChange={e => setFormula(e.target.value)} type="password" placeholder="Sua fórmula para média" />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="mx-auto mt-5">
                {renderInputs()}
            </Row>

            <Row className='add-subject-form justify-content-center'>
                <button style={{ width: '50%' }} className={`mt-5 ${canSubmit}`} type="submit">Submit</button>
            </Row>

        </>
    );
}

export default FormFloatingBasicExample;
