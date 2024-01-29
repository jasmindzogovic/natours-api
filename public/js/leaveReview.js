import axios from 'axios';

import { showAlert } from './alert';

export const leaveReview = async (review, rating, tourId) => {
  try {
    const res = await axios.post('/api/v1/reviews/', {
      review,
      rating,
      tour: tourId,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Left review successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
