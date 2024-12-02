import TelaCadUsu from "./telas/TelaCadUsu";
import TelaMenu from "./telas/TelaMenu";
import TelaBatePapo from "./telas/TelaBatePapo";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TelaMenu />} />
            <Route path="/usuario" element={<TelaCadUsu />} />
            <Route path="/batepapo" element={<TelaBatePapo/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
