import axios from '../../axios/index';

export default {
  list: () => axios.get('/medical'),
  new_medical: (data) => axios.post('/medical', data),
};
