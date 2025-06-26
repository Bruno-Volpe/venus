import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import db from '../../service/firebaseConnection';

import { toast } from 'react-toastify';

const ModalComponent = ({ show, setShow, id }) => {
    const navigator = useNavigate()

    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'subject', id);
            const querySnapshot = await getDoc(docRef);

            if (querySnapshot.empty) {
                toast.alert("Nenhum evento encontrado com o nome pesquisado.");
                return;
            }

            await deleteDoc(querySnapshot.ref)
            navigator('/')
            toast.success('Evento deletado com sucesso!');
        } catch (error) {
            toast.error("Erro ao deletar evento, tente novamente mais tarde.");
        }
    }

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Remoção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja remover este evento?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={e => handleRemove(e)}>
                        Remover
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// Validação de props
ModalComponent.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default ModalComponent;
