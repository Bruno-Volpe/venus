import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Nav from '../../components/nav';
import resizeImage from '../../util/resizeImg'; // Importando a função
// import SearchImages from '../../components/searchImage';

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db, { auth, storage } from '../../service/firebaseConnection';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';

function App() {
    const [subjectName, setSubjectName] = useState('');
    const [techerName, setTecherName] = useState('');
    const [techerEmail, setTecherEmail] = useState('');
    const [media, setmedia] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleFormat = () => {
        setSubjectName('')
        setTecherEmail('')
        setTecherName('')
        setmedia(0)
    }


    //TODO: criar notas 
    //TODO: criar imagem
    //TODO: criar formula -> MathJax

    const formValidate = () => {
        let errorMessage = '';

        if (subjectName === '' || techerName === '' || techerEmail === '' || media === '') {
            errorMessage = 'Preencha todos os campos';
        }

        if (typeof media !== 'number') {
            try {
                parseFloat(media)
            } catch (err) {
                errorMessage = 'A média deve ser um número';
            }
        };


        return errorMessage;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return
        setLoading(true);

        const errorMessage = formValidate();

        if (errorMessage === '') {
            try {
                if (selectedFile) {
                    const resizedFile = await resizeImage(selectedFile); // Utilizando a função

                    const storageRef = ref(storage, `images/${resizedFile.name}`);
                    await uploadBytes(storageRef, resizedFile);

                    const imageUrl = await getDownloadURL(storageRef);

                    await addDoc(collection(db, "subject"), {
                        subjectName,
                        techerEmail,
                        techerName,
                        media,
                        formula: '',
                        quantidadeProvas: 0,
                        notas: [{}],
                        imageUrl,
                        userId: auth.currentUser.uid,
                    });
                    handleFormat()
                    toast.success('Matéria adicionada com sucesso!');
                } else {
                    toast.warning('Selecione uma imagem');
                }
            } catch (err) {
                toast.error('Erro ao adicionar matéria. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
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
                                <Form.Control required onChange={e => setSubjectName(e.target.value)} value={subjectName} placeholder="Nome Materia" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control required onChange={e => setTecherName(e.target.value)} value={techerName} placeholder="Nome professor" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control required onChange={e => setTecherEmail(e.target.value)} value={techerEmail} type="email" placeholder="Email professor" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control required type='number' onChange={e => setmedia(e.target.value)} value={media} placeholder="media da disciplinas" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="mb-1 me-3">Selecione Imagem</Form.Label>
                                <Form.Control
                                    type="file"
                                    required
                                    accept="image/*"
                                    placeholder='Escolha imagem'
                                    name="file"
                                    style={{ height: '100%' }}
                                    onChange={(e) => setSelectedFile(e.target.files[0])} // Atualiza o estado quando um arquivo é selecionado
                                />
                            </Form.Group>


                            <button disabled={loading} type="submit" className="w-100 mt-1">
                                Submit
                            </button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        </>
    );
}

export default App;
