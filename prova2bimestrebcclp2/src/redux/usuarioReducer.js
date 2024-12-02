import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estado";
import { gravarUsuario, consultarUsuario } from "../servicos/servicoUsu.js";

export const incluirUsuario = createAsyncThunk('incluirUsuario', async (usuario) => {
    const resultado = await gravarUsuario(usuario);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            usuario
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

export const buscarUsuarios = createAsyncThunk('buscarUsuarios', async () => {
    const resultado = await consultarUsuario();
    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Usuarios recuperados com sucesso",
                "listaDeUsuarios": resultado
            };
        } else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Usuarios do backend",
                "listaDeUsuarios": []
            }
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem,
            "listaDeUsuarios": []
        };
    };
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeUsuarios: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarUsuarios.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando reequisição (buscando usuarios)"
            })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeUsuarios = action.payload.listaDeUsuarios;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(incluirUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Incluindo usuario)";
            })
            .addCase(incluirUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaDeUsuarios.push(action.payload.usuario);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default usuarioReducer.reducer;