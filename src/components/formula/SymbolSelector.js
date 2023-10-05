import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const SymbolSelector = ({ onSelect }) => {
    const symbols = [
        '7', '8', '9', '\\div',
        '4', '5', '6', '\\times',
        '1', '2', '3', '-',
        '0', '.', '+', '=',
        '(', ')', '\\log', '\\sum', '\\lim'
    ];

    const handleSymbolClick = (symbol) => {
        onSelect(symbol);
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <div className="calculator">
                        {symbols.map((symbol, index) => (
                            <Button
                                key={index}
                                variant="outline-secondary"
                                onClick={() => handleSymbolClick(symbol)}
                                className="m-1"
                            >
                                <BlockMath>{symbol}</BlockMath>
                            </Button>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SymbolSelector;
