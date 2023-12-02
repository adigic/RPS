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

  // Eventlyssnare för användarens val som sedan skickas in i funktionen "playRound"
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

}