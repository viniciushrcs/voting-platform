import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarTop = ({ connect, connected, becomeMember, isMember }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container fluid>
        <Navbar.Brand href="/">Pesquisas da Comunidade @vinichagas.io</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isMember && (
              <Button
                style={{ marginTop: '10px' }}
                variant="success"
                onClick={becomeMember}
                className="btn-sm px-3 d-block d-md-inline-block me-md-2 mb-2 mb-md-0"
              >
                Autenticar
              </Button>
            )}
          </Nav>
          <Nav>
            {!connected ? (
              <Button
                style={{ marginTop: '10px' }}
                onClick={connect}
                className="btn-sm px-3 d-block d-md-inline-block"
              >
                Conectar carteira
              </Button>
            ) : (
              <p style={{ marginTop: '10px' }}>Carteira Conectada</p>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
