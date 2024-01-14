import axios from 'axios';

import { showAlert } from './alert';

export const updateData = async (name, email) => {
  try {
    const res = await axios.patch(
      'http://127.0.0.1:8000/api/v1/users/updateMe',
      {
        name,
        email,
      },
    );

    if (res.data.status === 'success') {
      showAlert('success', 'Changed data successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios.patch(
      'http://127.0.0.1:8000/api/v1/users/updateMyPassword',
      {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    );

    if (res.data.status === 'success') {
      showAlert('success', 'Changed password successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
