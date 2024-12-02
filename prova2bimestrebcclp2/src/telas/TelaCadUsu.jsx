import FormCadUsu from "./form/FormCadUsu";
import { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import TabUsu from "./tabelas/TabUsu";

export default function TelaCadUsu() {
    const [modoEdicao, setModoEdicao] = useState(false);
    const [exibirTabela, setExibirTabela] = useState(false);
    const [usuSelecionado, setUsuSelecionado] = useState({
        "id": 0,
        "nickname": "",
        "urlAvatar": "",
        "dataIngresso": "",
        "senha": "",
        "mensagens":[]
    });

    return (
        <>
            <Container>
                <Alert className="mt-2 mb-2 text-center" variant="light">
                    <h2>
                        Usuarios
                    </h2>
                </Alert>
            </Container>
            {
                exibirTabela ?
                    <TabUsu setModoEdicao={setModoEdicao}
                        setUsuSelecionado={setUsuSelecionado}
                        setExibirTabela={setExibirTabela} /> :

                    <FormCadUsu modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        usuSelecionado={usuSelecionado}
                        setUsuSelecionado={setUsuSelecionado}
                        setExibirTabela={setExibirTabela} />
            }
        </>

    );
}