function startGame() {
  // Hämta användarnamnet från inputfältet
  var usernameInput = document.getElementById("username");
  var username = usernameInput.value;

  // Kontrollera om användarnamnet är tomt
  if (!username) {
    // Visa felmeddelande med en "alert" och markera input med röd ram
    usernameInput.style.border = "2px solid red";

    // Hämta eller skapa ett element för "usernameWarning"
    var usernameWarning = document.getElementById("usernameWarning");

    if (!usernameWarning) {
      usernameWarning = document.createElement("p");
      usernameWarning.id = "usernameWarning";
      user.appendChild(usernameWarning);
    }

    // Uppdatera innehållet och stilen för "usernameWarning"
    usernameWarning.innerHTML = "username invalid";
    usernameWarning.style.color = "red";

    return;
  }

  // Återställ ramen till standard om användarnamn finns
  usernameInput.style.border = "";

  // Spara användarnamnet i localStorage
  localStorage.setItem("username", username);

  // Ta bort startknappen och andra element
  var startButton = document.getElementById("startButton");
  var gameTitle = document.getElementById("gameTitle");
  var userLogin = document.getElementById("user");
  startButton.remove();
  gameTitle.remove();
  userLogin.remove();

  // Ladda spelet (game.html)
  window.location.href = "game.html";
}
