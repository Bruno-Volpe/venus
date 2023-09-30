import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Nav from '../../components/nav';

import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore"
import db from '../../service/firebaseConnection';

import './style.css';

function App() {
    const [subjectName, setSubjectName] = useState('');
    const [techerName, setTecherName] = useState('');
    const [techerEmail, setTecherEmail] = useState('');
    const [formula, setFormula] = useState('');

    //TODO: fazer um form validate
    const formValidate = () => {
        return true;
    }

    //TODO: fazer partes das notas

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formValidate()) {
            try {
                await addDoc(collection(db, "subject"), {
                    subjectName,
                    techerEmail,
                    techerName,
                    formula
                });
                window.alert('Evento adicionado com sucesso!')
            } catch (err) {
                window.alert("Erro ao adicionar evento, tente novamente mais tarde");
            } finally {
                return
            }
        }
        alert('Formulario invalido')
    }
    return (
        <>
            <Nav />
            <Container className='meio'>
                <Row className="row mt-5">
                    <Col col='12' md='8' className='add-subject-form d-flex align-items-center justify-content-center flex-column'>
                        <h1 className="text-center mt-5">Adicione</h1>
                        <h5 className="text-center mb-3">nova materia</h5>
                        <Form onSubmit={e => handleSubmit(e)} style={{ maxWidth: '400px', width: '100%' }}>
                            <Form.Group className="mt-5 mb-3">
                                <Form.Control onChange={e => setSubjectName(e.target.value)} value={subjectName} placeholder="Nome Materia" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control onChange={e => setTecherName(e.target.value)} value={techerName} placeholder="Nome professor" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={e => setTecherEmail(e.target.value)} value={techerEmail} type="email" placeholder="Email professor" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control onChange={e => setFormula(e.target.value)} value={formula} placeholder="Formula da disciplinas" />
                                <Form.Text className="text-muted">Considere trabalhos, provas. Tudo que vale nota</Form.Text>
                            </Form.Group>

                            <button type="submit" className="w-100 mt-5">
                                Submit
                            </button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
