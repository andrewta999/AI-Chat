import axios from 'axios';

const API_URL = 'http://localhost:5000/chat';

export const getChats = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

export const postMessage = async (chatID: string | null, text: string) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const response = await axios.post(API_URL, { chatID, text }, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};
