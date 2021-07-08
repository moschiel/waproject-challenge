import {decode} from 'html-entities';
import './Question.scss';

const QUESTION_STORAGE_KEY = '@wa-project/questions';

function saveAnswer(questionIdx, answerIdx){
    //update question storage
    let questionsStorage = JSON.parse(localStorage.getItem(QUESTION_STORAGE_KEY));
    questionsStorage[questionIdx].user_answer = answerIdx;
    localStorage.setItem(QUESTION_STORAGE_KEY, JSON.stringify(questionsStorage));
    //update question style
    let elems = document.querySelectorAll(`ul#answer_${questionIdx} li`);
    elems.forEach((e) => {                  //reset answers style
        e.classList.remove('answer-selected');
    });
    elems[answerIdx].classList.add('answer-selected'); // set chosen answer style
}

//iterate over answers
export default function Question(props){
    let answersComponent=[];
    props.question.answers.forEach((answer, answerIdx)=>{
        let id = `answer_${props.question.index}_${answerIdx}`;
        let userAnswer = props.question.user_answer;
        let className;
        if(userAnswer === answerIdx)
            className = 'answer answer-selected';
        else
            className = 'answer';
        
        answersComponent.push(
            <li 
                className={className}
                key={id} 
                id={id}
                onClick={()=>saveAnswer(props.question.index, answerIdx)}>
                <p>{decode(answer)}</p>
            </li>
        );
    });

    return (
        <div className='question'>
            <p className='title'>{props.question.index+1} - {decode(props.question.title)}</p>
            <div>
                <ul id={`answer_${props.question.index}`}>
                    {answersComponent}
                </ul>
            </div> 
        </div>
    );
}