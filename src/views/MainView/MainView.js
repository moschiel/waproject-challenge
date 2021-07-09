import { useState, useContext } from 'react';
import axios from 'axios';
import DropBoxNumberRange from '../../components/DropBoxNumberRange/DropBoxNumberRange';
import SimpleModal from '../../components/SimpleModal/SimpleModal';
import QuizView from '../QuizView/QuizView';
import ResultsView from '../ResultsView/ResultsView';
import { MyContext } from '../../context/MyContext';
import './MainView.scss';

const QUESTION_STORAGE_KEY = '@wa-project/questions';
const RESULTS_STORAGE_KEY = '@wa-project/results';

export default function MainView() {
  const { setView, setApiResult } = useContext(MyContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
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
        setLoadingModalOpen(true);
        let req = await getApiQuestions();
        if(req.ok) {  
          setApiResult(req.results);
          localStorage.setItem(RESULTS_STORAGE_KEY, false);
          //setModalOpen(false);
          //setLoadingModalOpen(false);
          setView(<QuizView/>);
        }else {
          setLoadingModalOpen(false);
          setApiResult(null);
          console.log('Error get API: ' + req.err);
          alert('Error get API: ' + req.err);
        }
      }else { //continue previous quiz
        if(existLocalQuestions()) {
          setApiResult(null);
          setView(<QuizView/>);
        }else {
          alert("Error: there isn't previous quiz stored!");
        }
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
  function existLocalResults() {
    console.log("GET RESULTS LOCAL");
    return (localStorage.getItem(RESULTS_STORAGE_KEY) === 'true');
  }
  
  console.log("CURRENT SELECTION:", selection);

  let continueButton = <></>;
  if(existLocalResults()) {
    continueButton = (
      <button className="mainViewButton" 
        onClick={()=>{setView(<ResultsView />)}}>
          see results
      </button>);
  }
  else if(existLocalQuestions()) {
    continueButton = (
      <button className="mainViewButton" 
        onClick={()=>{StartTest(false)}}>
          continue
      </button>);
  }
  
  return (
      <div className="mainView">
        <h1>general knowledge quiz</h1>
        <div>
          <DropBoxNumberRange
            title="select number of questions: "
            min={1}
            max={50}
            onChange={handleDropBoxChange}
          />
          <div>
            <button className="mainViewButton" onClick={OpenModal}>new quiz</button>
          </div>
          <div>
            {continueButton}
          </div>
        </div>
        <SimpleModal 
          open={modalOpen}
          title="Attention, this action will erase previous quiz!" 
          nameBtn1="Start" 
          nameBtn2="Cancel"
          onClickBtn1={()=>{StartTest(true)}}
          onClickBtn2={CloseModal}
          onClose={CloseModal}
        />
        <SimpleModal
          title="Loading..."
          open={loadingModalOpen}
        />
      </div>
  );
}