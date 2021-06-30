import { useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './service/api';
import SimpleModal from './components/Modal/SimpleModal';

function App() {

  function StartModal() {
    console.log("START MODAL");
  }

  function SelectQuestions() {
    let options = [];
    for (let i = 0; i < 50; i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }

    return (
      <>
        <label htmlFor="questions">selecione a quantidade de questões:</label>
        <select name="questions" key="questions">
          {options}
        </select>
      </>
    );
  }
  

  return (
    <div className="App">
      <h>teste de conhecimentos gerais</h>
      <div>
        <SelectQuestions/>
      </div>
      <button onClick={StartModal}>ok</button>
      <SimpleModal/> 
    </div>
  );
}

export default App;
