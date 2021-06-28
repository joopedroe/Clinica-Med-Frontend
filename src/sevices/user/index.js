import axios from '../../axios/index';

export default {
  login: (data) => axios.post('/login', data),
  new_user: (data) => axios.post('/register', data),
};
