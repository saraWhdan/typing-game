// globals

let score = 0;
let isPlaying;
var current_progress = 100;
let timer;
const symbols = ['ready', 'steady', 'Go'];
let count = 0;
const levels = {
  easy: [180, 3],
  medium: [150, 3],
  hard: [120, 4],
};
const words = [
  "hat", "river", "lucky", "statue", "generate", "stubborn", "cocktail", "runaway",
  "joke", "developer", "establishment", "hero", "javascript",
  "nutrition", "revolver", "echo", "siblings", "investigate",
  "horrendous", "symptom", "laughter", "magic", "master", "space", "definition",
  "sigh", "tense", "airplane", "ball", "pies", "juice", "warlike",
  "bad", "north", "dependent", "steer", "silver", "highfalutin","css",
  "certainly", "chair", "challenge", "chance", "change", "character",
   "charge", "check", "child", "choice", "choose", "church",
  "superficial", "quince", "eight", "feeble", "admit", "drag", "loving",
];
let selectedLevel;
let timeForOnePrecent;
let freeze;
// dom elements
const remove = document.getElementById("remove");
const settingBtn = document.getElementById("settingBtn");
const wrapper = document.getElementById("wrapper");
const btn = document.getElementById("btn");
const wordInput = document.getElementById("word-input");
const currentWord = document.getElementById("current-word");
const scoreDisplay = document.getElementById("score");
const bar = document.getElementById("dynamic");
const modal         =document.getElementById('ModalCenter');
const modalBody     = document.getElementById('modal-body');
const modalReload   = document.getElementById('modalReload');
const radioButtons = document.querySelectorAll('input[name="select"]');

reload();


//Restoring saved Values
function reload() {
  // Radiobuttons    
  // get a list of DOM elements
  // var G1 = Array.from(document.getElementsByName('select'));
  if(localStorage.getItem('selectedLevel')){
   selectedLevel = localStorage.getItem('selectedLevel');
   timeForOnePrecent = levels[selectedLevel][0];
      freeze = levels[selectedLevel][1];}

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].value == selectedLevel) {
      radioButtons[i].checked = true;
    }
  }
}




for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', function (e) {
    if (this.checked) {
      selectedLevel = this.value;
       localStorage.setItem('selectedLevel', selectedLevel);
      timeForOnePrecent = levels[selectedLevel][0];
      freeze = levels[selectedLevel][1];
      
    }
  });
}

settingBtn.addEventListener("click", () => {
  wrapper.style.display = "block";
});
remove.addEventListener("click", () => {
  wrapper.style.display = "none";
});

btn.onclick =
  function init() {
    btn.remove();
    wordInput.style.display = "flex";
    wordInput.disabled = true;
    let inthandle = setInterval(() => {
      currentWord.innerHTML = symbols[parseInt(count / 2, 10)];
      if (count % 2 !== 0) {
        currentWord.classList.add("out");
      } else {
        currentWord.classList.remove("out");
      }
      count++;
      if (count === symbols.length * 2) {


        clearInterval(inthandle);
        currentWord.style.transform = 'scale(1)';
      }
    }, 1000);

    setTimeout(gam, 6000);

  }


function gam() {
  wordInput.disabled = false;
  showWord(words);
  wordInput.focus();
  wordInput.addEventListener("input", startMatch);
  timer = setInterval(dynamicBar, (timeForOnePrecent || 180));
  

}

function startMatch() {
  if (matchWords()) {
    currentWord.style.color = "#2fb049";
    current_progress += (freeze || 3);
    
    setTimeout(() => {
      showWord(words);
      currentWord.style.color = "white";
      wordInput.value = "";
      increaseScore();
    }, 500);
  }
};


function progress() {
  score++;
  scoreDisplay.innerHTML = score;
  if (score == i) clearInterval(x);
}
let x;
let i = 0;

function increaseScore() {
  x = setInterval(progress, 50);
  i += 10;
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {

    return true;
  } else {
    return false;
  }
}

function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);

  currentWord.innerHTML = words[randIndex];
}


function dynamicBar() {
  current_progress -= 1;
  bar.style.width = current_progress + "%";
  bar.innerHTML = current_progress + "%";
  if (current_progress === 0) {
    clearInterval(timer);
    finish();
  }
}



 function finish() {
  // Show the modal
  modal.style.display = 'block';
  let result = '';
  const message = `Your score is <strong>${score}</strong> `;

  if (score >= 10 && score < 20) {
      result = `
          <div class="modal-icon my-3"><img src="images/sleeping.svg" class="media-object"></div>
          <div class="media-body p-2">
              <h4 class="media-heading">So Slow!</h4>
              <p class="lead pt-2">${message} You should do more practice!</p>
          </div>`
  } else if (score >=20 && score < 40) {
      result = `
          <div class="modal-icon my-3"><img src="images/thinking.svg" class="media-object"></div>
          <div class="media-body p-2">
              <h4 class="media-heading">About Average!</h4>
              <p class="lead pt-2">${message} You can do better!</p>
          </div>`
  } else if (score >= 40 ) {
      result = `
          <div class="modal-icon my-3"><img src="images/party-popper.svg" class="media-object"></div>
          <div class="media-body p-2">
              <h4 class="media-heading">Great Job!</h4>
              <p class="lead pt-2">${message} You're doing great!</p>
          </div>`
  
  } else {
      result = `
          <div class="modal-icon my-3"><img src="images/smart.svg" class="media-object"></div>
          <div class="media-body p-2">
              <h4 class="media-heading">Hmmm!</h4>
              <p class="lead pt-2">Please stop playing around and start typing!</p>
          </div>`
  }
  modalBody.innerHTML = result;
  modalReload.addEventListener('click', () => location.reload());}
  