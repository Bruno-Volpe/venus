import React, { useState } from 'react';
import { createApi } from 'unsplash-js';
import { Modal, Button, Image, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';

const SearchImages = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImageURL, setSelectedImageURL] = useState(null); // Novo estado para a imagem selecionada

    const unsplash = createApi({ accessKey: 'hmEMNSh7z_lRhx6_BTEmpBDdl_8BaRu8ZO1NweVXiCs' });

    const searchImages = () => {
        unsplash.search.getPhotos({
            query,
            page: 1,
            perPage: 20,
            orientation: 'portrait',
        })
            .then(response => {
                if (response.errors) {
                    console.error('Error:', response.errors[0]);
                } else {
                    setResults(response.response.results);
                }
            })
            .catch(error => console.error(error));
        setShowModal(true);
    };

    const handleImageClick = (e, imageUrl) => {
        // Remove a classe 'selected-image' de todas as imagens
        const images = document.querySelectorAll('.search-image');
        images.forEach(image => image.classList.remove('selected-image'));

        // Adiciona a classe 'selected-image' à imagem clicada
        e.target.classList.add('selected-image');

        setSelectedImage(imageUrl);
        setSelectedImageURL(imageUrl); // Atualiza o estado com a imagem selecionada
    }

    const handleSaveImage = () => {
        // Aqui você pode usar a imagem selecionada, que está em selectedImageURL
        // Faça o que precisar com ela (por exemplo, salve em outro estado)
        // Exemplo: setOutroEstado(selectedImageURL);
        setShowModal(false);
    }

    return (
        <div>
            {/* <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Pesquisar Imagens"
            />
            <button onClick={searchImages}>Pesquisar</button> */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Escolha uma imagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            {results.map(result => (
                                <Col xs={6} sm={6} md={4} lg={3} key={result.id}>
                                    <Image
                                        src={result.urls.full}
                                        alt={result.alt_description || 'Imagem'}
                                        className="search-image"
                                        onClick={(e) => handleImageClick(e, result.urls.full)}
                                        thumbnail
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveImage}>
                        Selecionar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SearchImages;
