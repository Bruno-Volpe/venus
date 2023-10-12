import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import { auth } from '../../service/firebaseConnection';

import logo from '../../assets/pngtree-venus-planet-isolated-on-white-background-png-image_4682545.png';

import './style.css';

function App() {
    const user = auth.currentUser;
    const displayName = user ? user.displayName : '';

    const handleLogout = e => {
        e.preventDefault();
        auth.signOut();
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <Image src={logo} fluid className="small-logo" />
                    Venus
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Nav className="me-auto" id="responsive-navbar-nav" >
                    <NavDropdown title="View mode" className="m2-3" id="collapsible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Modo1</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Modo2</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href='/storeNewSubject' className="button">
                        <FontAwesomeIcon icon={faPlus} />
                        Add new subject
                    </Nav.Link>
                </Nav>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ms-auto'>
                        <Navbar.Text >
                            Signed in as: {displayName}
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text onClick={e => handleLogout(e)}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mx-5 logout" />
                </Navbar.Text>
            </Container >
        </Navbar >

    );
}

export default App;
