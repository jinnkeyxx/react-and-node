/**
 * Auth Service
 */
import axios from 'axios';

const AuthService = {
  login: async function(username, password) {
    return await axios.post('/auth/login', { username, password });
  },
  register: function(data) {
    return axios.post('/auth/register', { data });
  },
  getProfile: function() {
    return axios.get('/profile/info', { headers: this.authHeader() });
  },
  logout: function () {
    localStorage.removeItem('token');
  },
  getToken: function() {
    return localStorage.getItem('token');
  },
  saveToken: function(token) {
    localStorage.setItem('token', token);
  },
  authHeader: function () {
    return { Authorization: this.getToken() }
  }
}

export default AuthService