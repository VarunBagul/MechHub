import axios from 'axios';
import { showAlert } from './alerts.js';

const login_btn = document.querySelector('#login-btn');
const loginForm = document.querySelector('.login-form');

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'User Registration Successfull!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged In Successfully!');
      login_btn.disabled = true;
      loginForm.classList.remove('active');

      const name = res.data.data.user.name.split(' ')[0];
      const span = `<span class="welcome_login">Hello, ${name}</span>`;
      login_btn.insertAdjacentHTML('afterend', span);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
