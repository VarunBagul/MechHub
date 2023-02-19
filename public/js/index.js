import { login, signup } from "./login.js";

// DOM ELEMENTS
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".form--signup");

// DELEGATION
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email_login").value;
    const password = document.getElementById("password_login").value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email_signup").value;
    const password = document.getElementById("password_signup").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    console.log(name, email, password, passwordConfirm);
    signup(name, email, password, passwordConfirm);
  });
}
