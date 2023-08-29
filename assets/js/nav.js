/*========= signup & logOut ==============*/
import { getCookie, deleteCookie, setCookie } from "./cookies.js";
let signup = document.getElementById("signup");
let logOut = document.getElementById("logOut");
let findUser = document.getElementById("findUser");
// user founded
if (getCookie("name")) {
  signup.classList.add("hide");
  logOut.classList.remove("hide");
  // show greeting
  var hiName = document.createElement("p");
  hiName.classList = "name";
  hiName.id = "name";
  hiName.innerHTML = `${getCookie("name")}`;
  findUser.before(hiName);
}
// Not founded
else {
  signup.classList.remove("hide");
  logOut.classList.add("hide");
}

////////////////////////// logout///////////////
logOut.addEventListener("click", () => {
  let UserName = document.getElementById("name");
  deleteCookie("name");
  signup.classList.remove("hide");
  logOut.classList.add("hide");
  UserName.classList.add("hide");
});
