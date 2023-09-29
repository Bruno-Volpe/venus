import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ modalShow, setModalShow, closeModal }) {
    const [fullscreen, setFullscreen] = useState(true);

    const handleCloseModal = () => {
        setModalShow(false)

        setTimeout(() => { setModalShow(!modalShow) }, 1)
    }

    return (
        <>
            <Modal show={modalShow} fullscreen={fullscreen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal body content</Modal.Body>
            </Modal>
        </>
    );
}

export default Example;