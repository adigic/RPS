let userScore = 0; // Initialisera användarens poäng
let computerScore = 0; // Initialisera datorns poäng
let scoreElement = document.getElementById("score");

gameStarted();

function gameStarted() {
  // Skapa ett nytt element för att visa användarnamnet
  var usernameDisplay = document.createElement("h1");
  var storedUsername = localStorage.getItem("username"); // Hämta användarnamn från localstorage

  // Skapa välkomstmeddelande till användaren
  usernameDisplay.innerHTML = "Welcome, " + storedUsername + "!";

  // Skapa ett nytt element för "Choose carefully"
  var chooseCarefully = document.createElement("p");
  chooseCarefully.innerHTML = "Choose carefully";

  // Lägg till de nya elementen i "text" div
  var textDiv = document.getElementById("text");
  textDiv.appendChild(usernameDisplay);
  textDiv.appendChild(chooseCarefully);

  // Skapa nya knappar med unika ID:n inuti "choices"
  createButton("rock", "rockButton");
  createButton("paper", "paperButton");
  createButton("scissor", "scissorButton");

  // Koppla knapparna till spelomgången
  document.getElementById("rockButton").addEventListener("click", function () {
    playRound("rock");
  });

  document.getElementById("paperButton").addEventListener("click", function () {
    playRound("paper");
  });

  document.getElementById("scissorButton").addEventListener("click", function () {
    playRound("scissors");
  });
}

function createButton(text, id) {
  // Skapa en div om den inte redan finns
  var choicesDiv = document.getElementById("choices");
  if (!choicesDiv) {
    choicesDiv = document.createElement("div");
    choicesDiv.id = "choices";
    document.getElementById("wrapper").appendChild(choicesDiv);
  }

  // Skapa knappen och lägg till den i "choices" div
  var newButton = document.createElement("button");
  newButton.innerHTML = text;
  newButton.id = id;
  choicesDiv.appendChild(newButton);
}

// Funktion för själva spelrundan
function playRound(userChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);

  // Uppdatera poängställningen
  updateScore(result);

  // Skapa ett nytt element för att visa resultatet
  var resultDisplay = document.createElement("div");
  resultDisplay.id = "result"; // Add an ID "result" to the div

  // Skapa en <i> tagg och lägg till den i resultatdiven
  var icon = document.createElement("i");

  // Blev nå knas med att ställa in storleken på ikonen i CSS så fick göra det här
  icon.style.fontSize = "7rem";

  // Välj färg på ikonen beroende på resultat
  if (result === "WIN") {
    icon.className = "bx bxs-check-square";
    icon.style.color = "green";
  } else if (result === "TIE") {
    icon.className = "bx bxs-minus-square";
    icon.style.color = "grey";
  } else {
    icon.className = "bx bxs-x-square";
    icon.style.color = "red";
  }

  resultDisplay.appendChild(icon);

  // Visa ikonen i 2 sekunder och dölj den sedan
  setTimeout(function () {
    icon.style.display = "none";
    showResultText(resultDisplay, result);

    // Skapa tillbaka-knapp i "backDiv"
    backDiv.appendChild(backButton);

    // Kolla om "score" div redan finns
    var scoreDiv = document.getElementById("score");
    if (!scoreDiv) {
      // Om den inte finns, skapa den
      scoreDiv = document.createElement("div");
      scoreDiv.id = "score"; // Ge ID "score" till diven

      // Skapa en <p> tagg för att visa poängen
      var scoreElement = document.createElement("p");
      scoreElement.textContent = `You: ${userScore} | Computer: ${computerScore}`;

      // Lägg till <p> i scoreDiv
      scoreDiv.appendChild(scoreElement);

      // Lägg till scoreDiv i "wrapper" div
      var wrapperDiv = document.getElementById("wrapper");
      wrapperDiv.appendChild(scoreDiv);
    }
  }, 2000);

  removeScore();

  // Lägg till resultatet i "wrapper" div
  var wrapperDiv = document.getElementById("wrapper");
  wrapperDiv.appendChild(resultDisplay);

  // Dölj "text" div och "choices" div, visa "result" div
  hideTextAndChoicesAndShowResult();

  // Skapa en tillbaka-knapp
  var backButton = document.createElement("button");
  backButton.innerHTML = "Go back";
  backButton.addEventListener("click", function () {
    // Visa "text" och "choices" div igen och dölj "result" div
    showTextAndChoicesAndHideResult();

    // Ta bort resultatet och tillbaka-knappen
    resultDisplay.remove();
    backButton.remove();

    // Ta bort "back" div
    var backDiv = document.getElementById("back");
    if (backDiv) {
      backDiv.remove();
    }
  });

  // Skapa en ny div för "tillbaka-knappen" om den inte redan finns
  var backDiv = document.getElementById("back");
  if (!backDiv) {
    backDiv = document.createElement("div");
    backDiv.id = "back";
    document.getElementById("wrapper").appendChild(backDiv);
  }
}

// Funktion för att ta bort "score" div
function removeScore() {
  var scoreDiv = document.getElementById("score");
  if (scoreDiv) {
    scoreDiv.remove();
  }
}

// Funktion för att visa resultattexten
function showResultText(resultDiv, result) {
  // Skapa nytt <p> element för resultat texten
  var resultTextElement = document.createElement("p");
  resultTextElement.textContent = determineWinnerText(result);

  // Rensa innehåll i resultDiv
  resultDiv.innerHTML = "";

  // Skapa nytt <p> element i resultDiv
  resultDiv.appendChild(resultTextElement);

  // Hämta färgen baserat på resultatet
  var color = getResultColor(result);
  resultTextElement.style.color = color;
}

// Funktion för att välja texten som ska visas beroende på resultatet
function determineWinnerText(result) {
  updateScore(); // Update and display the score

  if (result === "WIN") {
    return "You Win!";
  } else if (result === "TIE") {
    return "It's a Tie!";
  } else {
    return "You Lose!";
  }
}

// Funktion för att hämta färg baserat på resultatet
function getResultColor(result) {
  if (result === "WIN") {
    return "green";
  } else if (result === "TIE") {
    return "white";
  } else {
    return "red";
  }
}

// Funktion för att dölja "text" div och "choices" div samt visa "result" div
function hideTextAndChoicesAndShowResult() {
  document.getElementById("text").style.display = "none";
  document.getElementById("choices").style.display = "none";
  document.getElementById("result").style.display = "block";
}

// Funktion för att visa "text" div och "choices" div samt dölja "result" div
function showTextAndChoicesAndHideResult() {
  document.getElementById("text").style.display = "block";
  document.getElementById("choices").style.display = "flex";
  document.getElementById("result").style.display = "none";
}

// Funktion för att skapa datorns val
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Funktion med logik för att avgöra vinnaren
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "TIE";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    userScore++;
    return "WIN";
  } else {
    computerScore++;
    return "LOSS";
  }
}

// Uppdatera och visa poängen
function updateScore() {
  var scoreElement = document.querySelector("#score p");
  if (scoreElement) {
    scoreElement.textContent = `You: ${userScore} | Computer: ${computerScore}`;
  }
}
