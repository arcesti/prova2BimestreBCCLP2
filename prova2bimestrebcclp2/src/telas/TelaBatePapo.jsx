import { Container, Col, Form, Row, Button } from "react-bootstrap";
import BatePapo from "./BatePapo";
import { useState, createContext } from "react";
import { Provider } from "react-redux";
import TelaLogin from "./TelaLogin";
import store from "../redux/store";

export const ContextoUsuario = createContext();

export default function TelaBatePapo() {
    const [usuario, setUsuario] = useState({
        "usuario": "",
        "logado": false
      });
    if (!usuario.logado) {
        return (
          <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
            <TelaLogin />
          </ContextoUsuario.Provider>
        );
    }
    else{
        return (
            <>
            <Provider store={store}>
                <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
                    <BatePapo />
                </ContextoUsuario.Provider>
            </Provider>
            </>
        );
    }

}