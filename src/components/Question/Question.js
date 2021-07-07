const QUESTION_STORAGE_KEY = '@wa-project/questions';

function saveAnswer(questionIdx, answerIdx){
    //update question storage
    let questionsStorage = JSON.parse(localStorage.getItem(QUESTION_STORAGE_KEY));
    questionsStorage[questionIdx].user_answer = answerIdx;
    localStorage.setItem(QUESTION_STORAGE_KEY, JSON.stringify(questionsStorage));
    //update question style
    let elems = document.querySelectorAll(`ul#answer_${questionIdx} li`);
    elems.forEach((e) => {                  //reset answers style
        e.style.color = 'black';
    });
    elems[answerIdx].style.color = 'blue'; // set chosen answer style
}

//iterate over answers
export default function Question(props){
    let answersComponent=[];
    props.question.answers.forEach((answer, answerIdx)=>{
        let id = `answer_${props.question.index}_${answerIdx}`;
        let userAnswer = props.question.user_answer;
        // console.log(props.question)
        answersComponent.push(
            <li key={id} 
                id={id}
                style={{color:userAnswer===answerIdx?"blue":"black"}} 
                onClick={()=>saveAnswer(props.question.index, answerIdx)}>
                <div>{answer}</div>
            </li>
        );
    });

    return (
        <div>
            <div>{props.question.index} - {props.question.title}</div>
            <div>
                <ul id={`answer_${props.question.index}`}>
                    {answersComponent}
                </ul>
            </div> 
        </div>
    );
}