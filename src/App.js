import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import api from './service/api';
import DropBoxNumberRange from './components/DropBoxNumberRange/DropBoxNumberRange';
import SimpleModal from './components/SimpleModal/SimpleModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  function OpenModal() {
    console.log("OPEN MODAL");
    setModalOpen(true);
  }
  function CloseModal() {
    console.log("CLOSE MODAL");
    setModalOpen(false);
  }
  function StartTest() {
    console.log("START TEST");
    setModalOpen(false);
  }

  return (
    <div className="App">
      <h>teste de conhecimentos gerais</h>
      <div>
        <DropBoxNumberRange
          title= "selecione a quantidade de perguntas: "
          min={1}
          max={50}
        />
      </div>
      <button onClick={OpenModal}>ok</button>
      <SimpleModal 
        open={modalOpen}
        title="DESEJA COMEÇAR O TESTE?" 
        nameBtn1="Iniciar" 
        nameBtn2="Cancelar"
        onClickBtn1={StartTest}
        onClickBtn2={CloseModal}
        onClose={CloseModal}
      /> 
    </div>
  );
}

export default App;
