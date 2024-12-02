import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { incluirUsuario } from '../../redux/usuarioReducer.js'
import { useDispatch } from 'react-redux';
import { Container, Button } from 'react-bootstrap';

export default function FormCadUsu(props) {
    const [usuario, setUsuario] = useState(props.usuSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const despachante = useDispatch();

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()){
            despachante(incluirUsuario(usuario));
            setFormValidado(false);
            alert("Cadastrado: " + usuario.nickname);
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    return (
        <Container className="mt-02 mb-02">
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Nickname
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" id="nickname" name="nickname" onChange={manipularMudanca} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Url Avatar
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" id="urlAvatar" name="urlAvatar" onChange={manipularMudanca} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Password" id='senha' name='senha' onChange={manipularMudanca} required />
                    </Col>
                </Form.Group>
                <Button type="submit">Cadastrar</Button>
            </Form>
        </Container>
    );
}