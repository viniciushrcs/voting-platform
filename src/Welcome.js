import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const WelcomeComponent = () => {
  return (
    <Container style={{ marginTop: '100px' }}>
      <Row>
        <Col>
          <h1>Bem-vindo à plataforma de pesquisas da comunidade @vinichagas.io</h1>
          <p>
            Se você for membro, basta sincronizar sua carteira e clicar no botão autenticar que a pesquisa atual vai aparecer.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomeComponent;