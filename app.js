//Global variable containing all question an answers and some counters
const store = {
  allQuestions: [
    {
      question: 'What k-drama is this scene from?',
      image: `<img src="scene.jpg" alt="Scene from My Love From Another Star" width=300>`,
      answers: [
        "Goblin",
        "Heirs",
        "My Love From Another Star",
        "Descendants of the Sun"
      ],
      correctAnswer: "My Love From Another Star"
    },
    {
      question: 'Who is this?',
      image: `<img src="park_bogum.jpg" alt="Park Bogum" width=300>`,
      answers: [
        'Lee Min Ho',
        'Park Bogum',
        'Gong Yoo',
        'Lee Dong-Wook'
      ],
      correctAnswer: 'Park Bogum'
    },
    {
      question: 'Who is this?',
      image: `<img src="park_bo_young.jpg" alt="Park Boyoung" width=300>`,
      answers: [
        'Park Shin Hye',
        'Bae Suzy',
        'Song Ji Hyo',
        'Park Bo-Young'
      ],
      correctAnswer: 'Park Bo-Young'
    },
    {
      question: 'Which drama is not based on a webtoon?',
      image: `<img src="K_webtoons.jpg" alt="Webtoon to Kdramas" width=300>`,
      answers: [
        'Cheese in the Trap',
        'Gangnam Beauty',
        'Goblin',
        "What's Wrong with Secretary Kim" 
      ],
      correctAnswer: 'Goblin'
    },
    {
      question: 'Which is not a part of the Reply Series?',
      image:`<img src="reply.jpg" alt="All Three Scenes Reply series" width=300>`,
      answers: [
        'Reply 1988',
        'Reply 1990',
        'Reply 1994',
        'Reply 1997'
      ],
      correctAnswer: 'Reply 1990'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  wrongAnswer: 0
};
/******************************************** EVENT HANDLER FUNCTIONS ************************************************/

//Starts the Quiz - Brings you to first question 
function handleStartQuiz(){
  $('main').on('click','#startQuiz', function(event){
    console.log ("click started")
    store.quizStarted = true
    render()
  })
}

function validity(){
  $('main').on('submit', '#answers', function(event){
    event.preventDefault();
    let submitted = $('input[name="answer"]:checked').val();
    console.log(submitted)
    console.log (store.allQuestions[store.questionNumber].correctAnswer)
    if(submitted === store.allQuestions[store.questionNumber].correctAnswer){
      store.score ++
      html = generateCorrectPage()
      $('main').html(html)
    } else{
      store.wrongAnswer ++
      html = generateWrongPage(store.allQuestions[store.questionNumber].correctAnswer)
      $('main').html(html)
    }
  })
}

function nextQuestion(){
  $('main').on('click', '#nextQuestion',function(event){
    store.questionNumber++;
    console.log("question number", store.questionNumber)
    render()
  })
}

function startQuizAgain(){
  $('main').on('click', '#startAgain', function(event){
  store.score = 0
  store.questionNumber = 0
  store.quizStarted = false
  render()
  })
}

/******************************************** TEMPLATE GENERATION FUNCTIONS ************************************************/
//Generate Main Page. Contains HTML to generate the First Page Seen when page first loads. 
function generateMainPage(){
  return `<div class="mainPage" id="mainPageFormat">
            <h2>Are You A K-drama Master?</h2>  
                <p>How much do you know about K-dramas? Have you watched enough or are you just getting started? Let's find out!</p>
                <button id ="startQuiz">Start Quiz</button>
          </div>`
}
//Generates question page  <div>${question.image}</div>
function generateQuestionPage(){
  let question = store.allQuestions[store.questionNumber]
  let answers = question.answers.map((answer,index) =>{
  if (index === 0){
      return `<input type= "radio" id="answer${index}" name="answer" value="${answer}" required>
             <label for="answer${index}">${answer}</label><br>`
    }
      return  `<input type= "radio" id="answer${index}" name="answer" value="${answer}">
              <label for="answer${index}">${answer}</label><br>`
  })
  
  return `<div class="mainPage">
            <form id = "answers">
              <h2>${question.question}</h2>
              <h3>Question ${store.questionNumber +1}/5 </h3>
              <div>${question.image}</div>
              <div id="answerFormat"> 
                ${answers.join("")} 
                <button id= "submitAnswerButton" type="submit" required> Submit Answer </button>
              </div>
              <div id="scoreFormat"> 
                <h4> Your Current Score is ${store.score} out of 5 </h4>
                <h4> You have ${store.wrongAnswer} incorrect so far </h4>
              </div>
            </form>
          </div>`
}

function generateCorrectPage(){
  return `<div class="mainPage">
            <h2>You Were Correct</h2>
              <h3> Good Job </h3> 
              <button id="nextQuestion"> Yay </button> 
          </div>`
}

function generateWrongPage(correctAnswer){
  return `<div class="mainPage">
            <h2>You Were Wrong</h2>
              <h3> Correct Answer was ${correctAnswer}</h3> 
              <button id="nextQuestion"> Okay </button> 
</div>`
}

function generateScorePage(){
 let statements = [];
  if (store.score < 3){
    statements.push( `<h4>Total Beginner: You need to watch more kdramas</h4>`)
  } else if (store.score === 3){
    statements.push( `<h4>Casual Watcher: You did well!</h4>`)
  } else if (store.score > 3){
    statements.push( `<h4>Master Level: You've seen them all!</h4>`)
  }
  
  return `<div class="mainPage" id="scorePageFormat">
            <h2>You Have Finished</h2>
              <h3> Your Final Score: ${store.score} out of 5 </h3> 
              ${statements}
              <button id="startAgain"> Start Quiz Again </button> 
          </div>`

}


/******************************************** RENDER FUNCTION(S) ************************************************/

function render(){
  let html =''
  if(store.quizStarted === false){
    html = generateMainPage();
  } else if (store.questionNumber === store.allQuestions.length){
    html = generateScorePage
  } else {
    html = generateQuestionPage();
  }
  $('main').html(html)
}

//Stores all functions to be called
function main(){
    render()
    handleStartQuiz()
    validity()
    nextQuestion()
    startQuizAgain()
}

$(main)


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */


