import axios from 'axios';

class AuthModel {
    async login(email, password) {
        // eslint-disable-next-line no-useless-catch
        try {
          const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
          const { token } = response.data;
          localStorage.setItem('token', token);
          return token;
        } catch (error) {
          throw error; // Re-throw the error for proper handling in the catch block
        }
      }
      
  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthModel();
