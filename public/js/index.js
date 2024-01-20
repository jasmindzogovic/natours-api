import 'core-js';
import 'regenerator-runtime/runtime';

import { login } from './login';
import { signup } from './singup';
import { logout } from './logout';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const formUserData = document.querySelector('.form-user-data');
const formUserPassword = document.querySelector('.form-user-password');
const signupForm = document.querySelector('.signup-form');
const bookBtn = document.getElementById('book-tour');
const backBtn = document.querySelector('.btn-back');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (formUserData) {
  formUserData.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (formUserPassword) {
  formUserPassword.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const passwordCurrent = document.getElementById('password-current').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    signup({ name, email, password, passwordConfirm });
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (backBtn)
  backBtn.addEventListener('click', () => {
    history.back();
  });
