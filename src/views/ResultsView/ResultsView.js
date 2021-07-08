import { useContext, useState } from 'react';
import { MyContext } from '../../context/MyContext';
import MainView from '../MainView/MainView';
import './ResultsView.scss';

export default function ResultsView() {
    const { setView } = useContext(MyContext);
    const QUESTION_STORAGE_KEY = '@wa-project/questions';

    let questionsStorage = JSON.parse(localStorage.getItem(QUESTION_STORAGE_KEY)); 
    let Results = [];

    questionsStorage.forEach(question => {
        Results.push(
            <li className='questionResult' key={`question_${question}`}>
                <p>{question.title}</p>
                <div>
                    <p>your anwser</p>
                    <p>{question.answers[question.user_answer]}</p>
                </div>
                <div>
                    <p>correct anwser</p>
                    <p>{question.answers[question.correct_answer]}</p>
                </div>      
            </li>
        );
    });

    return (
        <div className='ResultsView'>
            <ul>
                {Results}
            </ul>
            <button onClick={()=>setView(<MainView />)}>return</button>
        </div>
    );
}