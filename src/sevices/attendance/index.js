import axios from '../../axios/index';

export default {
  list: () => axios.get('/attendance'),
  newAttendance: (data) => axios.post('/attendance', data),
  update: (id, data) => axios.put(`/attendance/update/${id}`, data),
  get: (id) => axios.get(`/attendance/id/${id}`),
};
