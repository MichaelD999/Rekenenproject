import {QuizEvent} from "../model/QuizEvent.js"
export class QuizView {
    constructor(quiz) {
        this.quiz = quiz;
        this.quiz.addEventListener(QuizEvent.CHANGED, this.onQuestionsChanged);
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element
    }

    onQuestionsChanged = event => {
        this.showQuestion(event.questions[event.current]);
        this.showNav(event.questions[event.current], event.questions);
    };
    bindStartButton(){
        let start = this.getElement("#start");
        start.addEventListener('click', event =>{
            this.getElement('#questions').setAttribute('style', 'visibility:visible');
            this.getElement('#start').setAttribute('style', 'display:none');
        });
    }

    bindFormStudentSubmit(){
        let formStudent = this.getElement("#studentForm");
        formStudent.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log(" bindFormStudentSubmit");
            console.log(event);
            //1)
            let studentNameElement = document.getElementById("fname");
            console.log(studentNameElement.value);

            let studentKlasElement = document.getElementById("klas");
            console.log(studentKlasElement.value);


            this.getElement('#inleveren').style['display'] = 'block';
            studentNameElement.style['display']= 'none';
            console.log("formStudent");
            document.getElementById("newName").innerHTML = studentNameElement.value;

            document.getElementById('newName').removeAttribute('hidden');


            document.getElementById('newKlas').innerHTML = studentKlasElement.value;
            document.getElementById('newKlas').removeAttribute('hidden');
            studentKlasElement.style['display']= 'none';
            document.getElementById('formButton').style['display']= 'none';
            document.getElementById('start').style['display']= 'block';


        });
    }



    bindNextQuestionButton(handler) {
        this.next = this.getElement("#volgende");
        this.next.addEventListener('click', event => {
            handler();
        })
    }

    bindPreviousQuestionButton(handler) {
        this.next = this.getElement("#vorige");
        this.next.addEventListener('click', event => {
            handler();
        })
    }

    bindChoiceButton(handler) {
        this.choices = document.querySelectorAll("#btn1, #btn2, #btn3, #btn4");
        this.choices.forEach(element => element.addEventListener('click', event => {

            handler(element.id);
        }))
    }

    bindSubmitButton(handler) {
        this.submit = this.getElement("#inleveren");
        this.submit.addEventListener('click', event => {
            handler();
        })
    }


    showQuestion(currentQuestion) {
        const question = this.getElement('#vraag');
        question.innerHTML = currentQuestion.getQuestionID() + ". " + currentQuestion.getQuestion();

        this.getElement('#option1').innerHTML = currentQuestion.getOptions()[0];
        this.getElement('#option2').innerHTML = currentQuestion.getOptions()[1];
        this.getElement('#option3').innerHTML = currentQuestion.getOptions()[2];
        this.getElement('#option4').innerHTML = currentQuestion.getOptions()[3];

        this.getElement('#btn1').setAttribute('style', 'background-color:#0782f3');
        this.getElement('#btn2').setAttribute('style', 'background-color:#0782f3');
        this.getElement('#btn3').setAttribute('style', 'background-color:#0782f3');
        this.getElement('#btn4').setAttribute('style', 'background-color:#0782f3');


        if (currentQuestion.getGivenAnswer() != -1) {
            let id = '#btn' + currentQuestion.getGivenAnswer();
            this.getElement(id).setAttribute('style', 'background-color:#99ceff')
        }

    }

    showNav(currentQuestion, questions) {

        if (currentQuestion.getQuestionID() > 1) {
            this.getElement('#vorige').setAttribute('style', 'display:block');
        }
        else {
            this.getElement('#vorige').setAttribute('style', 'display:none');
        }

        if (currentQuestion.getQuestionID() < questions.length) {
            this.getElement('#volgende').setAttribute('style', 'display:block');
        }
        else {
            this.getElement('#volgende').setAttribute('style', 'display:none');
        }

        questions.forEach(vraag => {
            if (vraag.getQuestionID() === currentQuestion.getQuestionID()) {
                this.getElement('#no' + currentQuestion.getQuestionID()).style['border'] = '3px solid orange';
            }
            else {
                this.getElement('#no' + vraag.getQuestionID()).style['border'] = '1.5px solid  lightskyblue';
            }
        });

        questions.forEach(vraag => {
            if (vraag.getGivenAnswer() !== -1) {
                this.getElement('#no' + vraag.getQuestionID()).style['background-color'] = 'green';
            }
            else {
                this.getElement('#no' + vraag.getQuestionID()).style['background-color'] = '#000000';
            }
        });
        let aantalIngevuld = 0;
        questions.forEach(vraag => {

            if (vraag.getGivenAnswer() !== -1) {
                aantalIngevuld++;
            }
        });
        if (aantalIngevuld === parseInt(questions.length)) {
            this.getElement('#inleveren').style['display'] = 'block';
        }
        else {
            this.getElement('#inleveren').style['display'] = 'none';
        }
    }


    showResult() {
        let questions = this.quiz.getQuestions();
        console.log(questions);
        let contentHTML = this.getElement("#content");
        contentHTML.style['display'] = 'none';

        let result = this.getElement("#resultaat");
        result.style['display'] = 'block';

        let table = document.createElement("table");
        table.style.width = '100%';
        table.setAttribute('border', '1px solid black');

        let thead = table.createTHead();
        let row = thead.insertRow();

        let heads = ["nummer", "vraag", "jouw antwoord", "juiste antwoord", "oordeel"];
        for (let head in heads) {
            let th = document.createElement("th");
            let text = document.createTextNode(heads[head]);
            th.appendChild(text);
            row.appendChild(th);
        }
        let grade = 0.0;
        for (let question of questions) {
            console.log(questions);
            let row = table.insertRow();

            let cell = row.insertCell();
            let text = document.createTextNode(question.getQuestionID());
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(question.getQuestion());
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(question.getGivenAnswerFull());
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(question.getCorrectAnswerFull());
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(question.isCorrect());
            cell.appendChild(text);

            if (question.isCorrect() === "goed") {
                row.style['background-color'] = 'green';
                grade++;
                //grade.innerHTML = value;
            }
            else {
                row.style['background-color'] = 'red';
            }
        }
        result.appendChild(table);
        let playAgainButton = document.createElement('button');
        playAgainButton.id = 'start';
        playAgainButton.innerHTML = 'Nog een keer';
        playAgainButton.addEventListener('click', event => {
            this.quiz.reset();
            result.removeChild(table);
            result.removeChild(playAgainButton);
            result.style['display'] = 'none';
            contentHTML.style['display'] = 'grid';
        });
        result.appendChild(playAgainButton);
        console.log(grade);
        document.getElementById('newGrade').innerText = grade;
        console.log(document.getElementById("newGrade"));
        document.getElementById("gradeSection").removeAttribute("hidden");
        //var d = new Date();
        //var n = d.toLocaleDateString();
        //document.getElementById("gradeSection").innerHTML = n;

    }
}
