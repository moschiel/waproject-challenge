import { useContext, useState } from 'react';
import { MyContext } from '../../context/MyContext';


export default function QuizView() {
    const { setView, apiResult } = useContext(MyContext);

    function Questions() {
        let questions = [];
        apiResult.forEach((element, index) => {
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
        return questions;
    }

    return (
        <div>
            <Questions />
        </div>
    );
}

// let questions = []
// data.results.forEach((element, index) => {
// questions.push(
//     <>
//     <div>{index} - {element.question}</div>
//     <div>A) {element.incorrect_answers[0]}</div>
//     <div>B) {element.incorrect_answers[1]}</div>
//     <div>C) {element.incorrect_answers[2]}</div>
//     <div>D) {element.correct_answer}</div>
//     </>
// );
// });
// setQuestionList(questions);
// setView(2);

// return(
//     <div className="App">
//       {questionList}
//     </div>
//   );