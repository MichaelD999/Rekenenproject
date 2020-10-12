import {Question} from './Question.js'
import questions from './Questions.js'
import {QuizEvent} from "./QuizEvent.js";

export class Quiz extends EventTarget {
    constructor() {
        super();
        this.questions=questions;
        this.currentIndex = 0;
        this.questionsArray = [];
        this.reset();
    }

    setPreviousQuestion() {
        this.currentIndex--;
        this._commit();
    }

    setNextQuestion() {
        this.currentIndex++;
        this._commit();
    }

    setGivenAnswer(id) {
        this.questionsArray[this.currentIndex].setGivenAnswer(id);
        this._commit();
    }
    getQuestions() {
        return this.questionsArray;
    }

    reset() {
        let id = 1;
        this.questionsArray = [];
        for(let question of this.questions) {
            this.questionsArray.push(new Question(id++, question));
        }
        this.currentIndex = 0;
        this._commit();
    }

    _commit() {
        this.dispatchEvent(new QuizEvent(this.questionsArray, this.currentIndex))
    }
}