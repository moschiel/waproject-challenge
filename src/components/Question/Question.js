import { MyContext } from '../../context/MyContext';
const QUESTION_STORAGE_KEY = '@wa-project/questions';

function saveAnswer(questionIdx, answerIdx){
    //update question storage
    let questionsStorage = JSON.parse(localStorage.getItem(QUESTION_STORAGE_KEY));
    questionsStorage[questionIdx].userAnswer = answerIdx;
    localStorage.setItem(QUESTION_STORAGE_KEY, JSON.stringify(questionsStorage));
    //update question style
    let elems = document.querySelectorAll(`ul#ans_${questionIdx} li`);
    elems.forEach((e) => {                  //reset answers style
        e.style.color = 'black';
    });
    elems[answerIdx].style.color = 'blue'; // set chosen answer style
}

//iterate over answers
export default function Question(props){
    let answersComponent=[];
    props.question.answers.forEach((answer, answerIdx)=>{
        let id = `ans_${props.question.index}_${answerIdx}`;
        answersComponent.push(
            <li key={id} id={id} onClick={()=>saveAnswer(props.question.index, answerIdx)}>
                <div>{answer}</div>
            </li>
        );
    });

    return (
        <li key={`quest_${props.question.index}`}>
            <div>{props.question.index} - {props.question.title}</div>
            <div>
                <ul id={`ans_${props.question.index}`}>
                    {answersComponent}
                </ul>
            </div> 
        </li>
    );
}