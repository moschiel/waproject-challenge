import axios from 'axios';

const api = axios.create({
  baseURL: 'https://opentdb.com/api.php?amount=',
});

export default api; 