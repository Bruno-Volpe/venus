import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Placeholder from 'react-bootstrap/Placeholder';
import CardDetail from '../cardDetail'

import logo from '../../assets/pngtree-venus-planet-isolated-on-white-background-png-image_4682545.png';

import './style.css';

function Cards() {
    const [modalShow, setModalShow] = useState(false);

    const handleModal = (e) => {
        setModalShow(true);
    }

    const handleCloseModal = () => {
        setModalShow(false);
    }

    return (
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
            {Array.from({ length: 12 }).map((_, idx) => (
                <Col key={idx} onClick={e => handleModal(e)}>
                    <Card className='card-container mx-auto'>
                        <Card.Img variant="top" src={logo} />
                        <Card.Body>
                            <Card.Title>Materia</Card.Title>
                            <Card.Text>Last Udpate: 23/12/45</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            <CardDetail modalShow={modalShow} onClose={handleCloseModal} />
        </Row>

    );
}

export default Cards;
