import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ modalShow, onClose }) {
    const [fullscreen, setFullscreen] = useState(true);

    return (
        <Modal show={modalShow} fullscreen={fullscreen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Modal body content</Modal.Body>
        </Modal>
    );
}

export default Example;