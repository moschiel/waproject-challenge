import { useState, useContext } from 'react';
import api from '../../service/api';
import axios from 'axios';
import DropBoxNumberRange from '../../components/DropBoxNumberRange/DropBoxNumberRange';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import QuizView from '../QuizView/QuizView';
import { MyContext } from '../../context/MyContext';

export default function MainView() {
  const { setView, setApiResult } = useContext(MyContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selection, setSelection] = useState(1);

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
  async function StartTest() {
      console.log("START TEST");
      await getQuestions();
      setModalOpen(false);
  }
  async function getQuestions() {
      console.log("GET QUESTIONS API");
      try {
        const {data} = await axios.get('https://opentdb.com/api.php?amount='+selection);
        console.log(data.results);
        setApiResult(data.results);
        setView(<QuizView/>);
      } catch (err) {
        console.log('Error get API: ' + err);
        alert('Error get API: ' + err);
      }
    }

  return (
      <div>
        <h>QUIZ</h>
        <div>
          <DropBoxNumberRange
            title="select number of questions: "
            min={1}
            max={50}
            onChange={handleDropBoxChange}
          />
          <button onClick={OpenModal}>New Quiz</button>
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