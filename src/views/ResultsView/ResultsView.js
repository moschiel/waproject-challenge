import { useContext } from 'react';
import { MyContext } from '../../context/MyContext';
import MainView from '../MainView/MainView';
import {decode} from 'html-entities';
import './ResultsView.scss';
import tickImg from './images/tick.png';
import wrongImg from './images/wrong.png';

{/* <div>Icons made by <a href="" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}

export default function ResultsView() {
    const { setView } = useContext(MyContext);
    const QUESTION_STORAGE_KEY = '@wa-project/questions';
    const RESULTS_STORAGE_KEY = '@wa-project/results';

    localStorage.setItem(RESULTS_STORAGE_KEY, 'true');

    let questionsStorage = JSON.parse(localStorage.getItem(QUESTION_STORAGE_KEY)); 
    let Results = [];
    
    let countRight = 0;

    questionsStorage.forEach(question => {
        let img;

        if(question.user_answer === question.correct_answer) {
            countRight++;
            img = tickImg;
        }else {
            img = wrongImg;
        }

        Results.push(
            <li className='questionResult' key={`question_${question}`}>
                <div className='title'>
                    <img src={img} alt='' width='25' height='25' />
                    <p>{question.index+1} - {decode(question.title)}</p>
                </div>
                <table>
                    <tr>
                        {question.user_answer !== question.correct_answer?
                            (<>
                                <th>your answer</th>
                                <th>correct answer</th>
                            </>)
                            :
                            <>
                                <th>correct answer</th>
                            </>
                        }
                    </tr>
                    <tr>
                        {question.user_answer !== question.correct_answer?
                            (<>
                                <td>{decode(question.answers[question.user_answer])}</td>
                                <td>{decode(question.answers[question.correct_answer])}</td>
                            </>)
                            :
                            <td>{decode(question.answers[question.correct_answer])}</td>
                        }
                    </tr>
                </table>     
            </li>
        );
    });

    let percentage = (countRight/questionsStorage.length)*100;
    percentage = percentage.toFixed(2);

    return (
        <div className='ResultsView'>
            <h1>Quiz Results</h1>
            <h2>You got {countRight} out of {questionsStorage.length} questions ({percentage}%)</h2>
            <ul>
                {Results}
            </ul>
            <div className='buttons'>
                <button onClick={()=>setView(<MainView />)}>return</button>
                <div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        </div>
    );
}