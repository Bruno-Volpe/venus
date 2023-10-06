import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { doc, getDoc } from "firebase/firestore";
import db from '../../service/firebaseConnection';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCog, faBook, faTrash, } from '@fortawesome/free-solid-svg-icons';

import { BlockMath } from 'react-katex';

import CardDetail from '../../util/cardDetail';

import Nav from '../../components/nav';
import ModalRemove from '../../components/removeModal';

import './style.css';
import { toast } from 'react-toastify';

function App() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [passou, setPassou] = useState(true)
    const [notas, setNotas] = useState([])
    const [subject, setSubject] = useState({})
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    const cardDetail = new CardDetail(subject.formula, notas, subject.quantidadeProvas);

    const handleRemove = (e) => {
        setShowRemoveModal(true);
    }

    const handleDate = () => {
        const dataOriginal = "2023-10-11";
        const dataObjeto = new Date(dataOriginal);
        const dia = dataObjeto.getDate();
        const mes = dataObjeto.getMonth() + 1; // Lembre-se que os meses em JavaScript são de 0 a 11
        const ano = dataObjeto.getFullYear();

        const dataFormatada = `${dia}/${mes}/${ano}`;

        return dataFormatada;
    }

    useEffect(() => {
        const loadSubject = async () => {
            try {
                const docRef = doc(db, 'subject', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    await setSubject(docSnap.data());
                    await setNotas(docSnap.data().notas);

                    // Check subject.formula inside the function
                    if (docSnap.data().formula === '' || docSnap.data().formula === undefined) {
                        return navigate(`/storeGrades/${id}`)
                    }
                } else {
                    navigate('/')
                    toast.error('Matéria não encontrada');
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

            <Container className='mt-5 responsive'>
                <>
                    <ModalRemove id={id} setShow={setShowRemoveModal} show={showRemoveModal} />
                    <Row className="justify-content-center m-1 forms-card-detail">
                        <Col className='mb-4 d-flex align-items-center justify-content-between' md={10}>
                            <h1 className='text-right mb-0'>{subject.subjectName}</h1>
                            <span className='text-left mb-0'>{subject.techerName} | {subject.techerEmail}</span>
                        </Col>
                        <hr />

                        <Col md={4} className="text-center mt-3">
                            <div className="mb-4 d-flex align-items-center justify-content-center">
                                <p className="mb-0">Fórmula média: <BlockMath math={`${subject.formula}`} /></p>
                            </div>
                        </Col>

                        <Col md={4} className="text-center mt-3">
                            <div className="mb-3">
                                <p>Media: {cardDetail.resolveFormula(subject.formula, notas)}</p>
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
                        {notas.map((el, index) => (
                            <Col key={index} lg={2} md={4} sm={6} xs={6} className="text-center mt-3">
                                <div className="mb-3">
                                    <p>P{index + 1}: {el.nota && el.nota.toFixed(1)}</p>
                                    <p>Data: {handleDate()}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <Row className="justify-content-center m-1 forms-card-detail">
                        <Col className='d-flex flex-column flex-md-row justify-content-between align-items-center' md={10}>
                            <Button onClick={() => navigate(`/storeNewSubject/${id}`)} variant="light" className="bg-info mb-1 mb-md-0">
                                <FontAwesomeIcon icon={faCog} className="" />
                                Configurações da Matéria
                            </Button>
                            <Button onClick={() => navigate(`/storeGrades/${id}`)} variant="light" className="bg-success mb-1 mb-md-0">
                                <FontAwesomeIcon icon={faBook} className="" />
                                Configurações das Notas
                            </Button>
                            <Button onClick={(e) => handleRemove(e)} variant="light" className="bg-danger mb-1 mb-md-0">
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
