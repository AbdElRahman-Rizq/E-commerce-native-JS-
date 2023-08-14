import { setCookie } from "./cookies.js";

var btn = document.getElementById("btnSubmit");

function validateForm(e) {
  // / Get the values of email and password input fields
  var emailInput = document.getElementById("email").value;
  var passwordInput = document.getElementById("password").value;

  // GET DATA FROM LOCALSTORAGE
// Retrieve the data from localStorage
const storedData = JSON.parse(localStorage.getItem('userCredentials')) || [];
let objectIndex=0;
// Access the email and password pairs
storedData.forEach(() => {

  // Validation
  if (storedData[objectIndex].email==emailInput&& storedData[objectIndex].password==passwordInput) {
    // get username from localStorage
    setCookie("name",storedData[objectIndex].name);

    // open Home Page
    window.open("./index.html");
    window.close()
        return 1
  }
  });
  document.getElementById("userError").textContent =
  "Invalid email or password.";
  return false; // Prevent form submission
  
  
}

btn.onclick = validateForm;
