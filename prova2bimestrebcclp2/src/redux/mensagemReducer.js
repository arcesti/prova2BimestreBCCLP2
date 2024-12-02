import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estado";
import { gravarMensagem, consultarMensagem } from "../servicos/servicoMes.js";

export const incluirMensagem = createAsyncThunk('incluirMensagem', async (mensagem) => {
    const resultado = await gravarMensagem(mensagem);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            mensagem
        };
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.mensagem
        };
    };
});

export const buscarMensagens = createAsyncThunk('buscarMensagens', async () => {
    const resultado = await consultarMensagem();
    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "listaMensagens": resultado.listaMensagens
            };
        } else {
            return {
                "status": false,
                "listaMensagens": []
            }
        };
    } catch (erro) {
        return {
            "status": false,
            "listaMensagens": []
        };
    };
});

const mensagemReducer = createSlice({
    name: 'mensagem',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaMensagens: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarMensagens.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando reequisição (buscando Mensagens)"
            })
            .addCase(buscarMensagens.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaMensagens = action.payload.listaMensagens;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarMensagens.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(incluirMensagem.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição (Incluindo Mensagem)";
            })
            .addCase(incluirMensagem.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaMensagens.push(action.payload.mensagem);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirMensagem.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default mensagemReducer.reducer;