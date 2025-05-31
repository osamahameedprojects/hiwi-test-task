import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to submit feedback');
  }
};

export const fetchFeedback = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/feedback`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch feedback');
  }
};