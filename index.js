(function() {
  "use strict";


  const HangmanMod = function()
  {
  	//Declaration of all variables
    let currentWord = '';
    let choosenLetter = '';
    let choosenLetters = [];
    let entryArray = [];
    let compareArrays = [];
    let level = 'easy'; //level by default
    let buttonSub = document.querySelector('.buttonPart'); // button class
    let playerInput = document.querySelector('#inputPart'); // input id
  
    let displayLettersPicked = document.querySelector('.display-letters'); //display letters
    let letterSpots = document.querySelector('.guess-here'); // letters that are still need to be guessed
    let turnCounter = document.querySelector('.turn-counter'); 
    let turnContainer = document.querySelector('.end-times p'); // show when it is game over
    let correctGuess = null;
    let turns = 0;
    let timer = null;
    let scaler = document.querySelector('.end-times');
    // Different parts of the Hangmann
    let hangmanHead = document.querySelector('.head');
    let hangmanBody = document.querySelector('.body');
    let hangmanArmLeft = document.querySelector('.arm-left');
    let hangmanArmRight = document.querySelector('.arm-right');
    let hangmanLegLeft = document.querySelector('.leg-left');
    let hangmanLegRight = document.querySelector('.leg-right');

    //Used to checked if the letter was already used, if it matched or if it is a mistake
    function checkLetters(choosenLetter) 
      {
          let checker = entryArray.indexOf(choosenLetter);
          if (checker < 0) { // uses IndexOf method to determine if the letter is in array, if false returns -1
            correctGuess = false;
            turns += 1;
            addParts();
          }
          if (checker >= 0) {
            correctGuess = true;
            turns += 0;
          }
          updateWord();
          turnTurnTurn();
          winning();
      }

    //Use the AJAX Link to get the word and check if the lenght is good or not
    function chooseWord(exWordCatcher, level)
    {
        currentWord = exWordCatcher;
      	//console.log(Object.keys(currentWord).length);
        //console.log(currentword);

        if (level == "easy") 
        { 
            if (Object.keys(currentWord).length >= 3 && Object.keys(currentWord).length <= 5){
        		displayWord(currentWord);
            }
            else{
            	hangmanApp.getWords();
            }
      	}

      	if (level == "medium") 
        { 
            if (Object.keys(currentWord).length >= 6 && Object.keys(currentWord).length <= 9){
        		displayWord(currentWord);
            }
            else{
            	hangmanApp.getWords();
            }
      	}

      	if (level == "hard") 
        { 
            if (Object.keys(currentWord).length >= 10 && Object.keys(currentWord).length <= 15){
        		displayWord(currentWord);
            }
            else{
            	hangmanApp.getWords();
            }
      	}
    }

    //Display the word while the user as succeeded
    function displayWord(currentWord) 
      {
      	//put the word in an array, so we can check faster with the checkLetter method, and show the border for each letter
          entryArray = currentWord.split('');
          compareArrays = currentWord.split('');

          letterSpots.innerHTML = '';
          for (let i = 0; i < entryArray.length; i++) {
            let item = document.createElement('span');
            item.innerHTML = entryArray[i];
            item.classList.add('indie-letters-hidden');
            letterSpots.appendChild(item);
          }
      }

    //Used to get an input from the user
    function getInput()
      {
        buttonSub.addEventListener('click', (event) => {
          event.preventDefault();

          choosenLetter = playerInput.value.toLowerCase();

          // new checker to see if you pick the same letter twice.
          let checker = choosenLetters.indexOf(choosenLetter);

      
          	if(choosenLetter == "1" || choosenLetter == "2" || choosenLetter == "3"){
          	alert("You choose the level : "+choosenLetter+". The page is going to refresh and a new game is going to begin. Good Luck !");         	
          }

          if(choosenLetter < 1 || choosenLetter > 3){
          	alert("You entered : "+choosenLetter+". The number doesn't correspond to a level.");
          	getInput();
          }

          if (checker < 0) { 
            choosenLetters.push(choosenLetter);
          }
          if (checker >= 0) { 
            alert('You already choose that letter!');
          }

          playerInput.value = '';
          displayLettersPicked.textContent = choosenLetters;
          checkLetters(choosenLetter);

        });
      }

    //Used if loosing and restart a game
    function turnTurnTurn() 
      {
          turnCounter.textContent = turns;
          if (turns === 6) {
            //Show when the game is over and the number of turns (guess) is over 6
            letterSpots.classList.add('guess-show');
            scaler.classList.add('scale-me');
            turnContainer.textContent = 'G A M E   O V E R';
            letterSpots.textContent = currentWord;
            setTimeout(function() { //3 sec refresh and restart the game
              location.reload();
            }, 3000);
          }
      }
    
    //Showing the differents parts of the hangmann depending of the number of mistakes
    function addParts() 
      {
          if (turns === 1) {
            hangmanHead.classList.add('show-hangman');
          }
          if (turns === 2) {
            hangmanBody.classList.add('show-hangman');
          }
          if (turns === 3) {
            hangmanArmLeft.classList.add('show-hangman');
          }
          if (turns === 4) {
            hangmanArmRight.classList.add('show-hangman');
          }
          if (turns === 5) {
            hangmanLegLeft.classList.add('show-hangman');
          }
          if (turns === 6) {
            hangmanLegRight.classList.add('show-hangman');
          }
      }

    //Showing letters when the user's guess is right
    function updateWord() 
      {
          for (let i = 0; i < entryArray.length; i++) {
            if (entryArray[i] === choosenLetter) {
              let item = document.querySelectorAll('.indie-letters-hidden')[i];
              item.classList.add('show-letter');
            }
          }
      }

    //When winning
    function winning() 
      {
          //Check if all the letters are discovered, show the score and refresh the page to restart a new game
          compareArrays = compareArrays.filter(val => !choosenLetters.includes(val));
          if (compareArrays.length === 0) {
            scaler.classList.add('scale-me');
            turnContainer.textContent = `${currentWord.toUpperCase()}`;
            letterSpots.textContent = currentWord;
            setTimeout(function() {
              location.reload();
            }, 3000);
          }
      }

    //AJAX Request
    function getWords() 
      {
      	 let http = new XMLHttpRequest();

          http.onreadystatechange = function() {
            if (http.readyState === 4 && http.status === 200) {
              let wordCatcher = JSON.parse(http.response);

              let myObj = wordCatcher["word"];
            //console.log(wordCatcher);
			//document.getElementById("word").innerHTML = wordCatcher.word;

              console.log(wordCatcher);
              console.log(myObj);
              console.log(level);

           	getInput();
            chooseWord(myObj,level);

            }
          };

		//https://hangman-api.lively.software/?difficulty=hard
        http.open('GET', 'https://hangman-api.lively.software/?difficulty='+level+'',true);
        http.send();

      }
	
	return {getWords: getWords};
  };

  const hangmanApp = HangmanMod();
  hangmanApp.getWords();
})();
