import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import { buscarMensagens } from '../redux/mensagemReducer.js'
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import ESTADO from '../redux/estado.js';

export default function BatePapo() {
    const { estado, mensagem, listaMensagens } = useSelector(estado => estado.mensagem);
    const despachante = useDispatch();
    useEffect(() => {
        despachante(buscarMensagens());
    }, [despachante]);

    if (estado === ESTADO.PENDENTE) {
        return (
            <>
                <h1>{mensagem}</h1>
            </>
        );
    }
    else if (estado === ESTADO.ERRO) {
        return (
            <h1>{mensagem}</h1>
        );
    }
    else if (estado === ESTADO.OCIOSO) {
        return (
            <>
                <h1>Mensagens: </h1>
                {
                    listaMensagens.map((mes) => (<Alert>{mes.mensagem}</Alert>))
                }
            </>
        );
    }
}