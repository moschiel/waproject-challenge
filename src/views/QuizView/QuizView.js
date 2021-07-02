import { useContext, useState } from 'react';
import { MyContext } from '../../context/MyContext';

export default function QuizView() {
    const { setView, apiResult } = useContext(MyContext);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //coloca resposta certa em posição aleatória.
    function scramble(incorrect_answers, correct_answer){
        let scrambled_options = ['','','',''];
        let randomPos = getRandomInt(0, 3);
        let k=0;
        scrambled_options.forEach((e, index)=>{
            if(index === randomPos)
                scrambled_options[index] = correct_answer;
            else {
                scrambled_options[index] = incorrect_answers[k];
                k++;
            }
        });
        return scrambled_options;
    }
    function Questions() {
        let questions = [];
        apiResult.forEach((e, index) => {
            console.log(e.type);
            
            if(e.type == 'multiple') {
                let options = scramble(e.incorrect_answers, e.correct_answer);
                console.log(options);
                questions.push(
                    <>
                    <div>{index} - {e.question}</div>
                    <div>A) {options[0]}</div>
                    <div>B) {options[1]}</div>
                    <div>C) {options[2]}</div>
                    <div>D) {options[3]}</div>
                    </>
                );
            }
            else if(e.type == 'boolean') {
                questions.push(
                    <>
                    <div>{index} - {e.question}</div>
                    <div>A) True </div>
                    <div>B) False </div>
                    </>
                );
            }
            else {
                questions.push(<div>!!! ERRO ERRO !!!</div>);
            }
        });
        return questions;
    }

    return (
        <div>
            <Questions />
        </div>
    );
}