import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from './usuarioReducer';
import mensagemReducer from './mensagemReducer';

const store = configureStore({
    reducer: {
        'mensagem': mensagemReducer,
        'usuario': usuarioReducer
    }
});

export default store;