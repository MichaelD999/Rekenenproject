export class Question {
    constructor(id, question) {
        this.id = id;
        this.question = question;
        this.givenAnswer = -1;
    }

    getQuestionID() {
        return this.id;
    }

    getQuestion() {
        return this.question.question;
    }

    getOptions() {
        return [this.question.option1, this.question.option2, this.question.option3, this.question.option4];
    }

    getCorrectAnswerFull() {
        let correctAnswer;
        switch (this.question.answer) {
            case 1: correctAnswer = this.question.option1;
                break;
            case 2: correctAnswer = this.question.option2;
                break;
            case 3: correctAnswer = this.question.option3;
                break;
            case 4: correctAnswer = this.question.option4;
                break;
        }
        return correctAnswer;
    }

    getGivenAnswerFull() {
        let givenAnswer;
        switch (this.givenAnswer) {
            case 1: givenAnswer = this.question.option1;
                break;
            case 2: givenAnswer = this.question.option2;
                break;
            case 3: givenAnswer = this.question.option3;
                break;
            case 4: givenAnswer = this.question.option4;
                break;
        }
        return givenAnswer;

    }

    getGivenAnswer() {
        return this.givenAnswer;
    }

    setGivenAnswer(givenAnswer) {
        this.givenAnswer = parseInt(givenAnswer.charAt(3));
    }

    isCorrect() {
        if (this.question.answer === this.givenAnswer) {
            return "goed";
        }
        return "fout";
    }
}