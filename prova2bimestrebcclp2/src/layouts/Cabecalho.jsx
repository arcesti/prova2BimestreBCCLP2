import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Menu</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#" as={Link} to="/usuario">Cadastro usuario</Nav.Link>
            <Nav.Link href="#" as={Link} to="/batepapo">Bate Papo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
