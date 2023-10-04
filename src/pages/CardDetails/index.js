import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

import { doc, getDoc } from "firebase/firestore";
import db, { auth } from '../../service/firebaseConnection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCog, faBook, faTrash, faL } from '@fortawesome/free-solid-svg-icons';

import { BlockMath } from 'react-katex';

import Nav from '../../components/nav';

import './style.css';

function App() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [passou, setPassou] = useState(true)
    const [notas, setNotas] = useState([5, 6])
    const [subject, setSubject] = useState({
        formula: '' // Inicializa com uma string vazia
    })
    useEffect(() => {
        const loadSubject = async () => {
            try {
                const docRef = doc(db, 'subject', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    await setSubject(docSnap.data());

                    // Check subject.formula inside the function
                    if (docSnap.data().formula === '' || docSnap.data().formula === undefined) {
                        return navigate(`/storeGrades/${id}`)
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        }

        loadSubject();
    }, [id, subject.formula, navigate]);

    return (
        <>
            <Nav />

            <Container className='mt-5'>

                <>
                    <Row className="justify-content-center m-1 forms-card-detail">
                        <Col className='mb-4 d-flex align-items-center justify-content-between' md={10}>
                            <h1 className='text-right mb-0'>Nome materia</h1>
                            <span className='text-left mb-0'>Nome Professor | email professor</span>
                        </Col>
                        <hr />

                        <Col md={4} className="text-center mt-3">
                            <div className="mb-4 d-flex align-items-center justify-content-center">
                                <p className="mb-0">Fórmula média: <BlockMath math="X + ln(e) + 9^2" /></p>
                            </div>
                        </Col>

                        <Col md={4} className="text-center mt-3">
                            <div className="mb-3">
                                <p>Media: 5</p>
                            </div>
                        </Col>

                        <Col md={4} className="text-center mt-3">
                            <div className="mb-3">
                                <p>Situação: <FontAwesomeIcon icon={passou ? faCheckCircle : faTimesCircle} className={`text-${passou ? 'success' : 'danger'}`} /></p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center m-1 forms-card-detail">
                        <Col className='mt-5 mb-4 d-flex align-items-center justify-content-between' md={10}>
                            <h1 className='text-right mb-0'>Notas</h1>
                        </Col>
                    </Row>

                    <Row className="justify-content-center m-1 mb-5 forms-card-detail" >
                        {notas.map((nota, index) => (
                            <Col key={index} lg={2} md={4} sm={6} xs={6} className="text-center mt-3">
                                <div className="mb-3">
                                    <p>P{index + 1}: {nota.toFixed(1)}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <Row className="justify-content-center m-1 forms-card-detail">
                        <Col className='d-flex justify-content-between' md={10}>
                            <Button variant="light" className="bg-info">
                                <FontAwesomeIcon icon={faCog} className="" />
                                Configurações da Matéria
                            </Button>
                            <Button variant="light" className="bg-success">
                                <FontAwesomeIcon icon={faBook} className="" />
                                Configurações das Notas
                            </Button>
                            <Button variant="light" className="bg-danger">
                                <FontAwesomeIcon icon={faTrash} className="" />
                                Remover Disciplina
                            </Button>
                        </Col>
                    </Row>
                </>
            </Container>
        </>
    );
}

export default App;
