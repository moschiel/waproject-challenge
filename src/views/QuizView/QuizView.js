import { useContext, useState } from 'react';
import { MyContext } from '../../context/MyContext';
import MainView from '../MainView/MainView';
import ResultsView from '../ResultsView/ResultsView';
import Question from '../../components/Question/Question';
import './QuizView.scss';

export default function QuizView() {
    const { setView, apiResult } = useContext(MyContext);
    const QUESTION_STORAGE_KEY = '@wa-project/questions';

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //put correct answers in a random position
    function scramble(incorrect_answers, correct_answer){
        let scrambled_answers = ['','','',''];
        let randomPos = getRandomInt(0, 3);
        let k=0;
        scrambled_answers.forEach((e, index)=>{
            if(index === randomPos)
                scrambled_answers[index] = correct_answer;
            else {
                scrambled_answers[index] = incorrect_answers[k];
                k++;
            }
        });
        return {
            "answers": scrambled_answers,
            "correct_answer": randomPos
        };
    }
    
    function createQuestionStorage() {
        let questionsStorage = [];

        if(apiResult != null) { //aloca novo quiz
            apiResult.forEach((e, i) => {
                if(e.type === 'multiple') {
                    let scrambled = scramble(e.incorrect_answers, e.correct_answer);
                    questionsStorage.push({
                        "index": i,
                        "title": e.question,
                        "answers": scrambled.answers,
                        "correct_answer": scrambled.correct_answer,
                        "user_answer": ""
                    });
                }
                else if(e.type === 'boolean') {
                    console.log(e.correct_answer);
                    questionsStorage.push({
                        "index": i,
                        "title": e.question,
                        "answers": ["True", "False"],
                        "correct_answer": (e.correct_answer==="True"? 0 : 1),
                        "user_answer": ""
                    });
                }
                else {
                    console.log("ERRO: createQuestionStorage");
                    alert("ERRO: createQuestionStorage");
                }
            });
            
            localStorage.setItem(QUESTION_STORAGE_KEY, JSON.stringify(questionsStorage));
        }
        else { //carrega quiz antigo
            questionsStorage = JSON.parse(localStorage.getItem(QUESTION_STORAGE_KEY));
        }
        
        return questionsStorage;
    }

    //iterate over questions
    function QuestionsList() {
        let QuestionsComponent = [];
        let questionsStorage = createQuestionStorage();

        questionsStorage.forEach((question)=>{
            //push question component
            QuestionsComponent.push(
                <li key={`question_${question.index}`}>
                    <Question question={question}/>
                </li>
            );
        });

        return (
            <div className='questionList'>
                <ul>
                    {QuestionsComponent}
                </ul>
            </div>
        );
    }


    return (
        <div className="quizView">
            <h1>general knowledge quiz</h1>
            <QuestionsList />
            <div className='quizButtons'>
                <button onClick={()=>setView(<MainView />)}>return</button>
                <button onClick={()=>setView(<ResultsView />)}>finish</button>
            </div>
        </div>
    );
}