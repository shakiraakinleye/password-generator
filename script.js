// DSIPLAY SELECTION
const passwordDisplay = document.querySelector(".js-password-display")
const lengthDisplay = document.querySelector(".js-length-display")
const lengthSlider = document.querySelector(".js-length-slider")

// CHECKBOX SELECTION
const checkBoxes = Array.from(document.querySelectorAll("[type ='checkbox']"))
const upperCaseBox = document.getElementById("uppercase-box")
const lowerCaseBox = document.getElementById("lowercase-box");
const numbersBox = document.getElementById("numbers-box");
const symbolsBox = document.getElementById("symbols-box");

// BUTTONS SELECTION
const copyBtn = document.querySelector(".js-copy-btn")
const generateBtn = document.querySelector(".js-generate-btn")
const closeOverlayBtn = document.querySelector(".js-btn-close-overlay")

// OTHER SELECTIONS
const copyBtnImage = document.querySelector(".js-copy-image");
const copyAlert = document.querySelector(".js-copy-alert")
const errorAlert = document.querySelector(".js-error-alert")
const errorText = document.querySelector(".js-error-text")
const overlay = document.querySelector(".js-overlay")


// characters 
const numbersChar = "0123456789";
const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz".toLowerCase();
const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase();
const symbolsChar = "~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/"


// FUNCTIONS

function initApp() {
  passwordDisplay.classList.add("text-gray-400")
  copyBtnImage.setAttribute("src", "images/copy-inactive.png");
}
initApp()



function getPasswordLength() {
  const passwordLength = Number(lengthSlider.value);
  return passwordLength;
}



function validateUserChoices() {
  if (checkBoxes.some((box) => box.checked) === false && lengthSlider.value < 6 ){
    return { valid: false, error: "select a character group and a length of 6 or above!" };
  }

  if (checkBoxes.some((box) => box.checked) === false) {
    return { valid: false, error: "no character group selected!" };
  }

  if (lengthSlider.value <= 6) {
    return { valid: false, error: "can not generate a password of less than 6 characters!" };
  }

  return { valid: true, error: "" };
}


function getCharacters() {
  let requiredChars = "";
  if (upperCaseBox.checked) requiredChars+=upperCaseChar;
  if (lowerCaseBox.checked) requiredChars+=lowerCaseChar;
  if (numbersBox.checked) requiredChars+=numbersChar;
  if (symbolsBox.checked) requiredChars+=symbolsChar;

  return requiredChars;
}


function generatePassword() {
  let password = "";
  const requiredChars = getCharacters();
  const passwordLength = getPasswordLength();

  for (let i = 0; i < passwordLength - 1; i++) {
    const charIndex = Math.floor(Math.random() * (requiredChars.length));
    password += requiredChars[charIndex];
  }

  return password;
}



function displayPassword(password) {
  passwordDisplay.textContent = password;
  passwordDisplay.classList.replace("text-gray-400", "text-black")
  copyBtnImage.setAttribute("src", "images/copy-active.png");
}




// ALERT FUNCTIONS
function displayCopyAlert() {
  copyAlert.classList.remove("hidden");
  overlay.classList.remove("hidden")
}

function hideCopyAlert() {
  copyAlert.classList.add("hidden");
  overlay.classList.add("hidden")

}

function displayErrorAlert(error) {
  errorAlert.classList.remove("hidden");
  errorText.textContent = error;
  overlay.classList.remove("hidden");
}



// HANDLER FUNCTIONS

// TO DISPLAY THE LENGTH VALUE SELECTED ON SLIDER
function sliderHandler() {
  lengthDisplay.textContent = lengthSlider.value;
}


function generateBtnHandler() {
  const { valid, error } = validateUserChoices();
  if (valid === false) {
    displayErrorAlert(error);
    return;
  }
  password = generatePassword();
  displayPassword(password)
}


function copyBtnHandler() {
  if (copyBtnImage.getAttribute("src") === "images/copy-active.png") {
    navigator.clipboard.writeText(passwordDisplay.textContent);
    displayCopyAlert()
    setTimeout(hideCopyAlert, 500);
    return;
  }
  displayErrorAlert("no password generated")
}


function hideErrorAlert() {
  errorAlert.classList.add("hidden");
  overlay.classList.add("hidden")
}




// EVENT HANDLERS
lengthSlider.addEventListener("input", sliderHandler)
generateBtn.addEventListener("click", generateBtnHandler)
copyBtn.addEventListener("click", copyBtnHandler)
overlay.addEventListener("click", hideErrorAlert);
closeOverlayBtn.addEventListener("click", hideErrorAlert)



// ALLOW USERS ENTER THE LENGTH IN THE INPUT AREA AND SHOULD REFLECT IN THE SLIDER