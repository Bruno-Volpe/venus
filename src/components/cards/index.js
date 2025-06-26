import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import db, { auth } from '../../service/firebaseConnection';
import './style.css';

function Cards() {
    const [subjects, setSubjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const q = query(collection(db, "subject"), where("userId", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const subjectData = querySnapshot.docs.map(doc => ({
                    id: doc.id,  // Adicionando o ID do documento ao objeto
                    ...doc.data()
                }));
                setSubjects(subjectData);
            } catch (error) {
                console.log(error);
            }
        }

        loadSubjects();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/cardDetails/${id}`);
    }

    return (
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="row-cards g-4">
            {subjects.length > 0 ? (
                subjects.map((subject, idx) => (
                    <Col key={idx}>
                        <Card className='card-container mx-auto' onClick={() => handleCardClick(subject.id)}>
                            {subject.imageUrl ? (
                                <Card.Img variant="top" className='background-card' src={subject.imageUrl} />
                            ) : (
                                <Placeholder as={Card.Img} variant="top" className='background-card' />
                            )}
                            <Card.Body className='body-card' >
                                <Card.Title>{subject.subjectName}</Card.Title>
                                <Card.Text>Professor: {subject.techerName}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            ) : (
                <Col xs={12} className='mt-5 text-center'>
                    Adicione novas matérias...
                </Col>
            )}
        </Row>
    );
}

export default Cards;
