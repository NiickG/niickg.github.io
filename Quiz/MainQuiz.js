var rightAnswer;

var maxTimer = 5;
var progress = 0;

var timer;

var maxCount = 0;
var count = 0;

var countrysBefore = "";

var gameType;
var difficulty;
var smarterOptions;
var noTimeLimit;

var addtime = false;

var successSound = new Audio('success_sound.mp3');
var wrongSound = new Audio('wronganswer.mp3');

let milliseconds = 0;
function onLoad()
{
    var urlParams = new URLSearchParams(window.location.search);

    gameType = decodeURIComponent(urlParams.get('type'));
    difficulty = decodeURIComponent(urlParams.get('difficulty'));
    smarterOptions = decodeURIComponent(urlParams.get('smarterOptions'));
    noTimeLimit = decodeURIComponent(urlParams.get('noTimeLimit'));

    for (let index = 0; index < data2020.children.length; index++) {
        const element = data2020.children[index];
        if(!element.noFlag)
        {
            maxCount++;
        }
    }
    document.getElementById("counter").innerHTML = "0/"+maxCount;
    var FlagToNameIF = document.getElementById("OptionType1");
    var FlagToTypeIF = document.getElementById("OptionType2");

    switch (gameType) {
        case "FlagToName":
            maxTimer = 5;
            FlagToNameIF.style.display = "contents";
            break;
        case "FlagToType":
            maxTimer = 15;
            FlagToTypeIF.style.display = "contents";
            break;
    
        default:
            break;
    }
    
    genQuestion();
    countUpTimer();

}
function genQuestion()
{
    var object = null;
    while(object === null||object.noFlag === true||countrysBefore.includes(object.title))
    {
        object = data2020.children[getRandomInt(data2020.children.length)];
    }
    QuestionImage.src = "https://raw.githubusercontent.com/hampusborgos/country-flags/ba2cf4101bf029d2ada26da2f95121de74581a4d/png1000px/"+object.id.toLowerCase()+".png";

    var OptionButtons = document.getElementsByClassName("OptionButton");
    rightAnswer = object;
    var rightQuestionIndex = getRandomInt(OptionButtons.length);
    OptionButtons[rightQuestionIndex].innerHTML = object.title;
    for (let index = 0; index < OptionButtons.length; index++) {
        if(index !== rightQuestionIndex){
            const element = OptionButtons[index];
            var country = null;
            while(country === null||country.id === object.id)
            {
                country = data2020.children[getRandomInt(data2020.children.length)];    
            }
            element.innerHTML = country.title;
        }
    }
    progress = 100;
    cancelAnimationFrame(timer)
    countdown(maxTimer);
}
function countdown(durationInSeconds) {
    var progressBar = document.getElementById('bar');
    var countdownDiv = document.getElementById('countdown');
    var totalTime = durationInSeconds * 1000;
    var startTime;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        progress = Math.min((elapsed / totalTime) * 100, 100);
        progressBar.style.width = progress + '%';

        var remainingTime = Math.ceil((totalTime - elapsed) / 1000);
        countdownDiv.textContent = 'Time Remaining: ' + remainingTime + 's';

        if (progress < 100) {
            timer = requestAnimationFrame(animate);
        } else {
            countdownDiv.textContent = 'Countdown Complete!';
            wrongSound.load();
            wrongSound.play();
            Skip();
        }
    }

    timer = requestAnimationFrame(animate);
}
function Skip()
{
    var rightAnswerLabel = document.getElementById("rightAnswer");
    rightAnswerLabel.innerHTML=rightAnswer.title;
    setTimeout(function () {
        rightAnswerLabel.innerHTML = "";
    }, 2000);
    genQuestion();
}
function countUpTimer() {
    const timerElement = document.getElementById('timer');

    const updateTimer = () => {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);

      const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
      const displaySeconds = (seconds % 60) < 10 ? '0' + (seconds % 60) : (seconds % 60);
      const displayMilliseconds = String((milliseconds % 1000) / 10).padStart(2, '0');

      timerElement.textContent = displayMinutes + ':' + displaySeconds + '.' + displayMilliseconds;
      
      milliseconds += 10;
    };
    updateTimer();

    const timerInterval = setInterval(updateTimer, 10);
  }
  function NewCountryInput(ele)
  {
    if(event.key === 'Enter') {
        if (ele.value !== "") {
            SetAnswer(ele.value);
            ele.value = "";
        }
    }
    else if(event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT)
    {
        ele.value = "";
        Skip();
    }
  }
  function SetOption(index)
  {
      SetAnswer(document.getElementById(index.toString()).innerHTML);
  }
  function SetAnswer(input)
  {
      if(input.toLowerCase() === rightAnswer.title.toLowerCase()||(input.toLowerCase() === rightAnswer.shortName.toLowerCase() && rightAnswer.shortName !== ""))
      {
          successSound.load();
          successSound.play();
          count++;
          countrysBefore += (rightAnswer.title + ",");   
          if(count === maxCount)
          {
              count = 0;
              countrysBefore = "";
          }
          var counterobj = document.getElementById("counter");
          counterobj.innerHTML = count+"/"+maxCount;
          animateTextColor(counterobj,"#42f560",500);
      }
      else
      {
          wrongSound.load();
          wrongSound.play();
          animateTextColor(document.getElementById("timer"),"#f55142",500);
          milliseconds+=3000;

          var rightAnswerLabel = document.getElementById("rightAnswer");
          rightAnswerLabel.innerHTML=rightAnswer.title;
          setTimeout(function () {
            rightAnswerLabel.innerHTML = "";
        }, 2000);
      }
      genQuestion();
  }
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function animateTextColor(label, color, time)
{
    label.style.color = color;
    setTimeout(function () {
        label.style.color = "white";
    }, time);
}