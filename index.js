var signName = document.getElementById("signName");
var signEmail = document.getElementById("signEmail");
var signPass = document.getElementById("signPass");
var signUp = document.getElementById("signUp");
var signIn = document.getElementById("signIn");
var showSignUp = document.querySelector(".showSignUp");
var showSignIn = document.querySelector(".showSignIn");
var logInButton = document.querySelector(".logInButton");
var signUpButton = document.querySelector(".signUpButton");
var logOutButon = document.querySelector("nav button");
var userInformation = [];
if (localStorage.getItem("usersList") == null) {
  var userInformation = [];
} else {
  userInformation = JSON.parse(localStorage.getItem("usersList"));
}
signUp.addEventListener("click", function () {
  hideRequired();
  signName.classList.replace("d-none", "d-block");
  showSignUp.classList.replace("d-block", "d-none");
  showSignIn.classList.replace("d-none", "d-block");
  logInButton.classList.replace("d-block", "d-none");
  signUpButton.classList.replace("d-none", "d-block");
});
signIn.addEventListener("click", function () {
  hideRequired();
  signName.classList.replace("d-block", "d-none");
  showSignUp.classList.replace("d-none", "d-block");
  showSignIn.classList.replace("d-block", "d-none");
  logInButton.classList.replace("d-none", "d-block");
  signUpButton.classList.replace("d-block", "d-none");
});
signUpButton.addEventListener("click", function () {
  addUser();
  clear();
});
function addUser() {
  if (checkEmptyForSignUp() == true) {
    if (alreadyExist() == true) {
      displayAlreadyExist();
    } else {
      var user = {
        name: signName.value,
        email: signEmail.value,
        password: signPass.value,
      };
      userInformation.push(user);
      localStorage.setItem("usersList", JSON.stringify(userInformation));

      displaySucess();
    }
  } else {
    showRequired();
  }
}
function clear() {
  signName.value = "";
  signPass.value = "";
  signEmail.value = "";
}
logInButton.addEventListener("click", function () {
  okLOGIn();
  clear();
});
function okLOGIn() {
  if (checkEmptyForLogIN() == true) {
    showRequired();
  } else {
    if (checkHaveAccount() == true) {
      showWelcomeBox();
    } else {
      displayIncorrectSomething();
    }
  }
}
var nameWelcome;
// THIS function to check if user have an account or not?//
function checkHaveAccount() {
  for (var i = 0; i < userInformation.length; i++) {
    if (
      userInformation[i].email == signEmail.value &&
      userInformation[i].password == signPass.value
    ) {
      nameWelcome = userInformation[i].name;
      document.querySelector(".Welcome p").innerHTML = `Welcome ${nameWelcome}`;
      return true;
    }
  }
  return false;
}
function showWelcomeBox() {
  document.querySelector(".login").classList.replace("d-block", "d-none");
  document.querySelector("nav").classList.replace("d-none", "d-block");
  document.querySelector(".Welcome").classList.replace("d-none", "d-block");
}
console.log();
function checkEmptyForSignUp() {
  if (signName.value != "" && signPass.value != "" && signEmail.value != "") {
    return true;
  } else {
    return false;
  }
}
function checkEmptyForLogIN() {
  if (signPass.value == "" || signEmail.value == "") {
    return true;
  } else {
    return false;
  }
}
logOutButon.addEventListener("click", function () {
  document.querySelector("nav").classList.replace("d-block", "d-none");
  document.querySelector(".Welcome").classList.replace("d-block", "d-none");
  document.querySelector(".login").classList.replace("d-none", "d-block");
  document.querySelector(".requiredBox").classList.replace("d-block", "d-none");
});

// c   h   e   c   k   b   o   x//

function alreadyExist() {
  for (var i = 0; i < userInformation.length; i++) {
    if (userInformation[i].email == signEmail.value) {
      return true;
    }
    else {
      
    }
  }
  return false;

}
function displayAlreadyExist() {
  document.querySelector(".requiredBox").classList.replace("d-none", "d-block");
  document
    .querySelector(".requiredBox span")
    .classList.replace("text-success", "text-danger");
  document.querySelector(".requiredBox span").innerHTML =
    "email already exists";
}

function showRequired() {
   document
     .querySelector(".requiredBox span")
     .classList.replace("text-success", "text-danger");
  document.querySelector(".requiredBox").classList.replace("d-none", "d-block");
  document.querySelector(".requiredBox span").innerHTML =
    "All inputs is required";
}
function displaySucess() {
  document.querySelector(".requiredBox").classList.replace("d-none", "d-block");
  document
    .querySelector(".requiredBox span")
    .classList.replace("text-danger", "text-success");
  document.querySelector(".requiredBox span").innerHTML = "Succsess";
}
function hideRequired() {
  document.querySelector(".requiredBox").classList.replace("d-block", "d-none");
}
function displayIncorrectSomething() {
   document
     .querySelector(".requiredBox span")
     .classList.replace("text-success", "text-danger");
  document.querySelector(".requiredBox").classList.replace("d-none", "d-block");
  document.querySelector(".requiredBox span").innerHTML =
    "incorrect email or password";
}
