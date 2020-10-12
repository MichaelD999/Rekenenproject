export class QuizEvent extends Event {
    static CHANGED = "quizChanged";

    constructor(questions, current) {
        super(QuizEvent.CHANGED);
        this.questions = questions;
        this.current = current;
    }
}