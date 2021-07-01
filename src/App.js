import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import api from './service/api';
import axios from 'axios';
import DropBoxNumberRange from './components/DropBoxNumberRange/DropBoxNumberRange';
import SimpleModal from './components/SimpleModal/SimpleModal';

function App() {
  const [screen, setScreen] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selection, setSelection] = useState(1);
  const [questionList, setQuestionList] = useState([]);

  console.log("CURRENT SELECTION:", selection);

  function handleDropBoxChange(e){
    setSelection(e.target.value);
  }
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
    getQuestions();
  }
  async function getQuestions() {
    console.log("GET QUESTIONS API");
    try {
      const {data} = await axios.get('https://opentdb.com/api.php?amount='+selection);
      // const {data} = await api.get('1');
      console.log(data.results);
      let questions = []
      data.results.forEach((element, index) => {
        questions.push(
          <>
          <div>{index} - {element.question}</div>
          <div>A) {element.incorrect_answers[0]}</div>
          <div>B) {element.incorrect_answers[1]}</div>
          <div>C) {element.incorrect_answers[2]}</div>
          <div>D) {element.correct_answer}</div>
          </>
        );
      });
      setQuestionList(questions);
      setScreen(2);
    } catch (err) {
      console.log('Error get API: ' + err);
    }
  }

  if(screen === 1) {
    return (
      <div className="App">
        <h>QUIZ</h>
        <div>
          <DropBoxNumberRange
            title="select number of questions: "
            min={1}
            max={50}
            onChange={handleDropBoxChange}
          />
          <button onClick={OpenModal}>enter</button>
        </div>
        <SimpleModal 
          open={modalOpen}
          title="START QUIZ?" 
          nameBtn1="Start" 
          nameBtn2="Cancel"
          onClickBtn1={StartTest}
          onClickBtn2={CloseModal}
          onClose={CloseModal}
        />
        
      </div>
    );
  } 
  else if(screen === 2) {    
    return(
      <div className="App">
        {questionList}
      </div>
    );
  }
}

export default App;
