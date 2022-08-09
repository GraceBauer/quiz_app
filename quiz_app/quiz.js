const url = 'quiz.json';
const questions = [];
const output = document.querySelector('.output');
const btn = document.querySelector('.btn');
let cur = 0;
const player = {
    punktzahl: 0,
    answers: []
}
const holder = [];
const totalOutput = document.querySelector('h1');

btn.addEventListener('click', (e) => {
    if (cur >= questions.length) {
     output.innerHTML = 'Game Over!';
    } else {
        newQuestion();
    }
    btn.style.display = 'none';
})
window.addEventListener('DOMContentLoaded', () => {
   
    loadQuestions();
})
function newQuestion() {
    updatePunktzahl();
    const el = questions[cur];
    el.options.sort(() => {
        return 0.5 - Math.random()
    });
    console.log(cur);
    console.log(questions.length);
    console.log(questions[cur]);
    output.innerHTML = '';
    const que1 = document.createElement('div');
    que1.classList.add('que');
     let strOutput = el.question;
    console.log(strOutput); 
    const ans1 = document.createElement('div');
     que1.textContent = strOutput + '?';
    holder.length = 0;
    el.options.forEach((ans) => {
        const div = document.createElement('div');
        holder.push(div);
        div.textContent = ans.response;
        div.classList.add('box');
        div.classList.add('boxCursor');
        div.correct = ans.correct;
        div.addEventListener('click', selOption);
        ans1.append(div);
    })
    output.append(que1);
    output.append(ans1);
}
function selOption(e) {
    
    console.log(e);
    endTurn();
  
    if (e.target.correct) {
        player.punktzahl++;
        updatePunktzahl();
        
        e.target.style.backgroundColor = 'green';
    } else {
        e.target.style.backgroundColor = 'red';
       
    }
    e.target.style.color = 'white';
    nextBtn();
}
function updatePunktzahl() {
    totalOutput.innerHTML = `${cur+1} von ${questions.length} Punktzahl: ${player.punktzahl}`;
   
}
if (localStorage.getItem('save')) { totalOutput.innerHTML = `${cur+1} von ${questions.length} Punktzahl: ${player.punktzahl}`;}

function endTurn() {
    holder.forEach((el) => {
        el.removeEventListener('click', selOption);
        el.style.backgroundColor = '#ddd';
        el.classList.remove('boxCursor');
    })
}
function nextBtn() {
    btn.style.display = 'block';
    cur++;
    if (cur >= questions.length) {
        btn.textContent = 'Punkte sehen';
    } else {
        btn.textContent = 'Nexte Frage';
    }
}
function loadQuestions() {
    fetch(url).then(rep => rep.json())
        .then((data) => {
            //console.log(data);
            data.forEach(el => {
                let temp = [];
                el.incorrect.forEach((ans) => {
                    let tempObj = {
                        "response": ans,
                        "correct": false
                    }
                    temp.push(tempObj);
                })
                let tempObj = {
                    "response": el.correct,
                    "correct": true
                }
                temp.push(tempObj);
               // console.log(temp);
                let mainTemp = {
                    "question": el.question,
                    "options": temp,
                   "correct": el.correct
                }
                questions.push(mainTemp);
            });
            console.log(questions);
            //document.write(JSON.stringify(questions));
        })
}

