import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardDetail from '../cardDetail';
import Placeholder from 'react-bootstrap/Placeholder'; // Importe o componente de placeholder

import logo from '../../assets/pngtree-venus-planet-isolated-on-white-background-png-image_4682545.png';

import { collection, getDocs, query, where } from "firebase/firestore";
import db, { auth } from '../../service/firebaseConnection';

import './style.css';

function Cards() {
    const [modalShow, setModalShow] = useState(false);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                const q = query(collection(db, "subject"), where("userId", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const subjectData = querySnapshot.docs.map(doc => doc.data());
                setSubjects(subjectData);
            } catch (err) {
                console.log(err);
            }
        }

        loadSubjects();
    }, []);

    const handleModal = (e) => {
        setModalShow(true);
    }

    const handleCloseModal = () => {
        setModalShow(false);
    }

    return (
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="row-cards g-4">
            {subjects.length > 0 ? (
                subjects.map((subject, idx) => (
                    <Col key={idx}>
                        <Card onClick={e => handleModal(e)} className='card-container mx-auto'>
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
                    Add news subjects...
                </Col>
            )}
            <CardDetail modalShow={modalShow} onClose={handleCloseModal} />
        </Row>
    );
}

export default Cards;
