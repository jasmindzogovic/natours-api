import axios from 'axios';

import { showAlert } from './alert';

export const editReviewFunc = async (review, rating, reviewId) => {
  try {
    const res = await axios.patch(`/api/v1/reviews/${reviewId}`, {
      review,
      rating,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Edited review successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
