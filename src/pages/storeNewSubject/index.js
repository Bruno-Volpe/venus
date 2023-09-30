import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Nav from '../../components/nav';
import SearchImages from '../../components/searchImage';

import { collection, addDoc } from "firebase/firestore";
import db, { auth } from '../../service/firebaseConnection';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';

function App() {
    const [subjectName, setSubjectName] = useState('');
    const [techerName, setTecherName] = useState('');
    const [techerEmail, setTecherEmail] = useState('');
    const [formula, setFormula] = useState('');

    //TODO: criar notas
    //TODO: criar imagem

    const formValidate = () => {
        let errorMessage = '';

        if (subjectName === '' || techerName === '' || techerEmail === '' || formula === '') {
            errorMessage = 'Preencha todos os campos';
        }

        return errorMessage;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = formValidate();

        if (errorMessage === '') {
            try {
                await addDoc(collection(db, "subject"), {
                    subjectName,
                    techerEmail,
                    techerName,
                    formula,
                    userId: auth.currentUser.uid
                });
                toast.success('Matéria adicionada com sucesso!');
                setFormula('');
                setSubjectName('');
                setTecherEmail('');
                setTecherName('');
            } catch (err) {
                toast.error('Erro ao adicionar matéria. Tente novamente mais tarde.');
            }
        } else {
            toast.warning(errorMessage);
        }
    }

    return (
        <>
            <Nav />
            <Container className='meio-forms'>
                <Row className="row-forms mt-5">
                    <Col col='12' md='8' className='add-subject-form d-flex align-items-center justify-content-center flex-column'>
                        <h1 className="text-center mt-5">Adicione</h1>
                        <h5 className="text-center mb-3">nova materia</h5>
                        <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
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
                    <SearchImages />
                </Row>
            </Container>
        </>
    );
}

export default App;
