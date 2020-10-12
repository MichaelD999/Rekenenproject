import {Quiz} from "../model/Quiz.js"
import {QuizView} from "../view/QuizView.js"

export class Controller {
    constructor() {
        this.quiz = new Quiz();

        this.quizView = new QuizView(this.quiz);

        this.quizView.bindNextQuestionButton(this.handleNextQuestion);
        this.quizView.bindPreviousQuestionButton(this.handlePreviousQuestion);
        this.quizView.bindChoiceButton(this.handleChoice);
        this.quizView.bindSubmitButton(this.handleSubmit);
        this.quizView.bindStartButton();
        this.quizView.bindFormStudentSubmit();
        this.quiz._commit();
    }

    handleNextQuestion = () => {
        this.quiz.setNextQuestion();
    };

    handlePreviousQuestion = () => {
        this.quiz.setPreviousQuestion();
    };

    handleChoice = (id) => {
        this.quiz.setGivenAnswer(id)
    };

    handleSubmit = () => {
        this.quizView.showResult();
    };
}
