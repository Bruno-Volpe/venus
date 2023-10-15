import React, { useEffect, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../service/firebaseConnection';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
const logo =  require('./../../assets/logo_venus.png')


function App() {
    const navigate = useNavigate();
    const [load, setLoad] = useState<boolean>(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/', { replace: true })
            } else {
                setLoad(true)
            }
        });
    }, [navigate])

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                navigate('/', { replace: true })
            })
            .catch(() => {
                toast.error("Erro ao logar, tente novamente mais tarde!");
                navigate('/')
            });
    }

    return (
        <>
            {load && (
                <Container fluid className="meio">
                    <Row className='row-login'>
                        <Col col='12' md='6' className='login-form d-flex align-items-center justify-content-center'>
                            <div className='text-center' >
                                <img src={logo} alt="logo" className="img-fluid" />
                                <h1 className="display-4">Venus</h1>
                                <small className="mb-4">Um sistema para você não surtar</small>
                                <button onClick={() => handleLogin()} className="w-75 mt-4">
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
