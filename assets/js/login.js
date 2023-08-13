// var btn = document.getElementById("btnSubmit");

// function validateForm(e) {

//   e.preventDefault();

//   // Get the values of email and password input fields
//   var emailInput = document.getElementById("email").value;

//   // Regular expression for email validation
//   var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// /*================================================================= */
// function setInputError(inputElement, message) {
  
//   inputElement.parentElement.querySelector(".error-message").textContent = message;
// }

// function clearInputError(inputElement) {
//   inputElement.parentElement.querySelector(".error-message").textContent = "";
// }

// // var passwordInput = document.getElementById("password").value;
//   document.querySelectorAll(".input").forEach((inputElement) => {

//     inputElement.addEventListener("blur", (e) => {
//       if (
//         e.target.id === "name" &&
//         e.target.value.length > 0 &&
//         e.target.value.length < 8
//       ) {
//         setInputError(
//           inputElement,
//           "Username must be at least 8 characters in length"
//         );
//         return false;

//       }
//       if (e.target.id === "email" && !emailRegex.test(e.target.value)) {
//         setInputError(
//           inputElement,
//           "Invalid email address. Please enter a valid email."
//         );
//         return false;

//       }
//       if (
//         e.target.id === "password" &&
//         e.target.value.length < 8
//       ) {
//         setInputError(
//           inputElement,
//           "Password must be at least 8 characters long."
//         );
        
        
//       }
//       if (
//         e.target.id === "confirmPassword" 
//         ) {
//           setInputError(
//             inputElement,
//             "Password must be at leas> 8 characters long."
            
//             );
            
//             return ;
//       }
      
//     });
//     inputElement.addEventListener("input", e => {
//       clearInputError(inputElement);
      
//   });
// });
// return; 
// }

// btn.onclick = validateForm;
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
  return true;
}

btn.onclick = validateForm;
