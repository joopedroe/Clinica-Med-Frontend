import axios from '../../axios/index';

export default {
  new_secretary: (data) => axios.post('/secretary/', data),
};
