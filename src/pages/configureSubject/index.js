import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import MathInput from '../../components/formula';

import { useParams, useNavigate } from 'react-router-dom';

import { doc, updateDoc, getDoc } from "firebase/firestore";
import db, { auth, storage } from '../../service/firebaseConnection';

import { toast } from 'react-toastify';

import Nav from '../../components/nav'

import CardDetail from '../../util/cardDetail';


import './style.css';

function FormFloatingBasicExample() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [quantidadeProvas, setQuantidadeProvas] = useState(1);
    const [notas, setNotas] = useState([]);
    const [formula, setFormula] = useState('');
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const loadSubject = async () => {
            try {
                const docRef = doc(db, 'subject', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    await setNotas(docSnap.data().notas);
                    setFormula(docSnap.data().formula);
                    setQuantidadeProvas(docSnap.data().quantidadeProvas);
                    setDatas(docSnap.data().notas.map(nota => nota.dueDate))
                }
            } catch (error) {
                alert.error('Erro ao buscar os dados');
            }
        }

        loadSubject();
    }, [id])

    const cardDetail = new CardDetail(formula, notas, quantidadeProvas);

    const handleDateChange = (index, value) => {
        const newDatas = [...datas];
        newDatas[index] = value;
        setDatas(newDatas);
    }


    const handleNotaChange = (index, value) => {
        const newNotas = [...notas];
        newNotas[index] = value;
        setNotas(newNotas);
    }

    const formValidate = () => {
        // Check if the formula is not empty
        if (formula.trim() === '') {
            toast.error('Please enter a formula.');
            return false;
        }

        if (quantidadeProvas <= 0) {
            toast.error('Quantidade de prova invalida')
            return false
        }

        if (cardDetail.checkVariableCount() === false) {
            toast.error('Quantidade de prova na formula invalida')
            return false
        }

        // Check if all notas are filled
        // if (notas.some(nota => nota === '')) {
        //     toast.error('Please fill in all nota fields.');
        //     return false;
        // }

        return true;
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!formValidate()) return
        try {
            const docRef = doc(db, "subject", id);

            const notasComDatas = []
            for (let i = 0; i < quantidadeProvas; i++) {
                notasComDatas.push({
                    nota: Number(notas[i]) || `n${i + 1}`,
                    dueDate: datas[i] || '',
                })
            }

            await updateDoc(docRef, {
                formula,
                notas: notasComDatas,
                quantidadeProvas
            });

            toast.success('Notas adicionadas com sucesso!');
            navigate(`/cardDetails/${id}`)
        } catch (err) {
            toast.error('Erro ao adicionar notas. Tente novamente mais tarde.');
        }
    }

    const renderInputs = () => {
        const inputs = [];
        for (let i = 0; i < quantidadeProvas; i++) {
            inputs.push(
                <Col key={i} sm={6} md={4} lg={3} className="d-inline-block mb-3 mx-auto text-center align-items-center">
                    <FloatingLabel controlId={`floatingInput${i}`} label={`P ${i + 1}`}>
                        <Form.Control
                            type="number"
                            placeholder={`Nota da prova ${i + 1}`}
                            value={notas[i] || ''}
                            onChange={(e) => handleNotaChange(i, e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId={`floatingDate${i}`} label={`Data da prova ${i + 1}`}>
                        <Form.Control
                            type="date"
                            value={datas[i] || ''}
                            onChange={(e) => handleDateChange(i, e.target.value)}
                        />
                    </FloatingLabel>
                </Col>
            );
        }
        return inputs;
    }


    return (
        <>
            <Nav />
            <Container className='mt-5'>
                <Row className="mx-auto">
                    <Col className="d-inline-block mb-3 mx-auto" sm={12} md={6}>
                        <FloatingLabel controlId="floatingInput" label="Quantidade de provas">
                            <Form.Control required value={quantidadeProvas} onChange={e => setQuantidadeProvas(e.target.value)} type="number" placeholder="Sua quantidade de prova" />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row className="mx-auto mb-5">
                    <Col className="d-inline-block mx-auto" sm={12} md={6}>
                        <MathInput formula={formula} setFormula={setFormula} />
                    </Col>
                </Row>

                <Row className="mx-auto mt-5">
                    {renderInputs()}
                </Row>

                <Row className='add-subject-form justify-content-center'>
                    <button onClick={e => handleSubmit(e)} style={{ width: '50%' }} className={`mt-5`} type="submit">Submit</button>
                </Row>
            </Container>
        </>
    );
}

export default FormFloatingBasicExample;
