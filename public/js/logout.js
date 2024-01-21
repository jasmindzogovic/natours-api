import axios from 'axios';

import { showAlert } from './alert';

export const logout = async () => {
  try {
    const res = await axios.get('/api/v1/users/logout');

    if (res.data.status === 'success') {
      location.assign('/');
      showAlert('success', 'Successfully logged out.');
    }
  } catch (error) {
    console.log(error);
    showAlert('error', 'Error logging out. Try again.');
  }
};
