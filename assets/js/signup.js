import { getCookie,setCookie } from "./cookies.js";

var btn = document.getElementById("btnSubmit");

function validateForm(e) {
  // / Get the values of email and password input fields
  var nameInput = document.getElementById("name").value;
  var emailInput = document.getElementById("email").value;
  var passwordInput = document.getElementById("password").value;
  var confirmPasswordInput = document.getElementById("confirmPassword").value;

  // Regular expression for email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // check the name
  if (nameInput<8) {
    document.getElementById("nameError").textContent =
    "Password must be at least 8 characters long.";

    return false; // Prevent form submission
  }else if(emailRegex.test(emailInput))document.getElementById("nameError").textContent ="";
  // Check if the email is valid
  if (!emailRegex.test(emailInput)) {
    document.getElementById("emailError").textContent =
      "Invalid email address. Please enter a valid email.";

    return false; // Prevent form submission
  }else if(emailRegex.test(emailInput))document.getElementById("emailError").textContent ="";

  // Check if the password has at least 8 characters
  if (passwordInput.length < 8) {
    console.log(passwordInput);
    document.getElementById("passwordError").textContent =
      "Password must be at least 8 characters long.";

    return false; // Prevent form submission
  }else if(passwordInput.length >= 8)document.getElementById("passwordError").textContent ="";
  // compare password
  if (passwordInput!==confirmPasswordInput) {
    console.log(passwordInput);
    document.getElementById("confirmError").textContent =
      "Password doesn't match";
    return false; // Prevent form submission
  }else if(passwordInput!==confirmPasswordInput)document.getElementById("confirmError").textContent ="";
  else if (getCookie(email)) {
    alert('User with this email already exists.');
    return;
  }


  
 

  // Save user to localStorage
  setCookie("name",nameInput);
  setCookie("email",emailInput);
  setCookie("password",passwordInput);
  return true;
}

btn.onclick = validateForm;
