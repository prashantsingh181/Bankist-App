'use strict';

import { accounts } from './accounts.js';

let passwordVisible = false;
let triedSubmittingForm = false;
const passwordInput = document.getElementById('pin');
const loginForm = document.querySelector('.login-form');
const formError = document.querySelector('.form-error');
const togglePasswordButton = document.querySelector('.toggle-password');
sessionStorage.removeItem('account');
let error = {};

const formValidation = {
  username: {
    required: true,
  },
  pin: {
    required: true,
    length: 4,
    type: 'number',
  },
};

function handlePasswordVisibilityToggle() {
  passwordVisible = !passwordVisible;
  passwordInput.type = passwordVisible ? 'text' : 'password';
  togglePasswordButton.querySelectorAll('svg').forEach(svg => svg.classList.toggle('hidden'));
}

function setFormError(formObject, error) {
  for (const key in formObject) {
    document.querySelector(`.${key}-error`).textContent = error[key];
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  triedSubmittingForm = true;
  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData.entries());

  validateForm(formObject, formValidation);

  if (Object.keys(error).some(item => item)) {
    setFormError(formObject, error);
    return;
  }

  const account = accounts.find(
    account => account.username === formObject.username,
  );
  if (!account || account.pin !== Number(formObject.pin)) {
    formError.textContent = 'Invalid Credentials!';
    return;
  }

  console.log('some');
  sessionStorage.setItem('account', JSON.stringify(formObject));
  window.location.href = 'index.html';
}

// helper function
function validateForm(formObject, formValidation) {
  error = {};
  console.log(formObject);
  Object.entries(formObject).forEach(([key, value]) => {
    const validation = formValidation[key];
    if (validation.required && value.trim() === '') {
      console.log(1);
      error[key] = `${capitalize(key)} is required`;
    } else if (
      validation.length &&
      (value.length > validation.length || value.length < validation.length)
    ) {
      error[key] = `${capitalize(key)} must be ${
        validation.length
      } characters long`;
    } else if (
      validation.type &&
      validation.type === 'number' &&
      isNaN(Number(value))
    ) {
      error[key] = `${capitalize(key)} must be a number`;
    }
  });
}

function handleInputChange() {
  if (triedSubmittingForm) {
    const formData = new FormData(loginForm);
    const formObject = Object.fromEntries(formData.entries());
    validateForm(formObject, formValidation);
    setFormError(formObject, error);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

loginForm.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', handleInputChange);
});
loginForm.addEventListener('submit', handleFormSubmit);
togglePasswordButton.addEventListener('click', handlePasswordVisibilityToggle)