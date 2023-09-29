import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../service/firebaseConnection';
import { onAuthStateChanged, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { Container, Row, Col, Button } from 'react-bootstrap';

import logo from '../../assets/pngtree-venus-planet-isolated-on-white-background-png-image_4682545.png'

import './index.css';

function App() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/', { replace: true })
            } else {
                setLoad(true)
            }
        });
    }, [navigate])

    const handleLogin = (e) => {
        signInWithRedirect(auth, provider)
            .then((result) => {
                //TODO: setar local stroage
                navigate('/', { replace: true })
            })
            .catch((error) => {
                console.error("Error signing in:", error);
                navigate('/')
            });
    }

    return (
        <>
            {load && (
                <Container fluid className="meio">
                    <Row className='row'>
                        <Col col='12' md='6' className='login-form d-flex align-items-center justify-content-center'>
                            <div className='text-center' >
                                <img src={logo} alt="logo" className="img-fluid" />
                                <h1 className="display-4">Venus</h1>
                                <small className="mb-4">Um sistema para você não surtar</small>
                                <button onClick={e => handleLogin(e)} className="w-75 mt-4" size="lg">
                                    <i className="fab fa-google mx-2"></i>
                                    Continue with Google
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default App;
