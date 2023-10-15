import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import db from '../../service/firebaseConnection';

import { toast } from 'react-toastify';

interface ModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    id: string | undefined
}

const ModalComponent = ({ show, setShow, id }: ModalProps) => {
    const navigator = useNavigate()

    const handleRemove = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            if (!id) {
                toast.error("ID do evento não encontrado.");
                return;
            }
            const docRef = doc(db, 'subject', id);
            const querySnapshot = await getDoc(docRef);

            if (!querySnapshot.exists()) {
                toast.error("Nenhum evento encontrado com o nome pesquisado.");
                return;
            }

            await deleteDoc(querySnapshot.ref)
            navigator('/')
            toast.success('Evento deletado com sucesso!');
        } catch (err) {
            toast.error("Erro ao deletar evento, tente novamente mais tarde");
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

export default ModalComponent;
