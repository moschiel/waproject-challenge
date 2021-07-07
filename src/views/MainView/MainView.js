import { useState, useContext } from 'react';
import api from '../../service/api';
import axios from 'axios';
import DropBoxNumberRange from '../../components/DropBoxNumberRange/DropBoxNumberRange';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import QuizView from '../QuizView/QuizView';
import { MyContext } from '../../context/MyContext';

const QUESTION_STORAGE_KEY = '@wa-project/questions';

export default function MainView() {
  const { setView, setApiResult } = useContext(MyContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selection, setSelection] = useState(1);

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
  async function StartTest(newQuiz) {
      console.log("START TEST");
      if(newQuiz) { //start a new quiz
        let req = await getApiQuestions();
        if(req.ok) {  
          setApiResult(req.results);
          setModalOpen(false);
          setView(<QuizView/>);
        }else {
          setApiResult(null);
          console.log('Error get API: ' + req.err);
          alert('Error get API: ' + req.err);
        }
      }else { //continue previous quiz
        setApiResult(null);
        setView(<QuizView/>);
      }
  }
  async function getApiQuestions() {
      // console.log(localStorage.getItem("QUESTION_STORAGE_KEY"));
      console.log("GET QUESTIONS API");
      try {
        const {data} = await axios.get('https://opentdb.com/api.php?amount='+selection);
        return {"ok":true, "results":data.results};
      } catch (err) {
        return {"ok":false, "err":err}
      }
  }

  function existLocalQuestions() {
    console.log("GET QUESTIONS LOCAL");
    return (localStorage.getItem(QUESTION_STORAGE_KEY) != null);
  }
  
  console.log("CURRENT SELECTION:", selection);

  let continueButton = <></>;
  if(existLocalQuestions())
    continueButton = <button onClick={()=>{StartTest(false)}}>continue last quiz</button>
  
  return (
      <div>
        <h1>QUIZ</h1>
        <div>
          <DropBoxNumberRange
            title="select number of questions: "
            min={1}
            max={50}
            onChange={handleDropBoxChange}
          />
          <button onClick={OpenModal}>start new quiz</button>
          {continueButton}
        </div>
        <SimpleModal 
          open={modalOpen}
          title="START QUIZ?" 
          nameBtn1="Start" 
          nameBtn2="Cancel"
          onClickBtn1={()=>{StartTest(true)}}
          onClickBtn2={CloseModal}
          onClose={CloseModal}
        />
      </div>
  );
}