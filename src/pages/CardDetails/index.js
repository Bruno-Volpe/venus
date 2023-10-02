import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import Nav from '../../components/nav';
import ConfigureSubject from '../../components/configureSubject';

import './style.css';

function App() {
    //TODO: ver se é a primeira vez que o suaurio entra na pagina, se sim, exbir carrosel para configurar
    return (
        <>
            <Nav />

            <Container className='mt-5'>
                <Row className="justify-content-center m-1 forms-card-detail">
                    <Col md={10}>
                        <h1 className='text-center mb-5' >Nome materia</h1>

                        <ConfigureSubject />
                    </Col>
                </Row>
            </Container>
        </>

    );
}

export default App;
