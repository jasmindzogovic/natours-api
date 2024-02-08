import 'core-js';
import 'regenerator-runtime/runtime';

import { login } from './login';
import { signup } from './singup';
import { logout } from './logout';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { likeTour } from './likeTour';
import { leaveReview } from './leaveReview';
import { editReviewFunc } from './editReview';
import { showAlert } from './alert';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const formUserData = document.querySelector('.form-user-data');
const formUserPassword = document.querySelector('.form-user-password');
const signupForm = document.querySelector('.signup-form');
const bookBtn = document.getElementById('book-tour');
const backBtn = document.querySelector('.btn-back');
const likeBtn = document.querySelector('.btn-like');
const reviewForm = document.querySelector('.form--review');
const editBtn = document.querySelectorAll('.btn--edit');
const editForm = document.querySelector('.form--edit');
const alertMessage = document.querySelector('body').dataset.alert;

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

if (likeBtn)
  likeBtn.addEventListener('click', () => {
    const slug = window.location.pathname.split('/').at(2);
    likeTour(slug);
  });

if (reviewForm)
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const tourId = document.getElementById('tour-id').value;

    leaveReview(review, rating, tourId);
  });

if (editBtn)
  editBtn.forEach((edit) =>
    edit.addEventListener('click', (e) => {
      const editForm = document.querySelector('.review-edit-form');
      editForm.classList.toggle('hide-edit-form');

      const review = e.target.parentElement.querySelector(
        '.review__card--comment',
      ).textContent;

      const rating = +e.target.parentElement
        .querySelector('.review__card--rating')
        .textContent.split(' ')
        .at(1);

      const reviewId = e.target.previousSibling.value;

      const editReview = document.getElementById('review');
      const editRating = document.getElementById('rating');
      const editReviewId = document.querySelector('.review--id');

      editReview.value = review;
      editRating.value = rating;
      editReviewId.value = reviewId;
    }),
  );

if (editForm)
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editReview = document.getElementById('review').value;
    const editRating = +document.getElementById('rating').value;
    const editReviewId = document.querySelector('.review--id').value;

    console.log(editReview, editRating, editReviewId);

    editReviewFunc(editReview, editRating, editReviewId);
  });

if (alertMessage) showAlert('success', alertMessage);
