import axios from 'axios';

class AuthModel {
    async login(email, password) {
        // eslint-disable-next-line no-useless-catch
        try {
          const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
          const { userId } = response.data;
          const { token } = response.data;
          localStorage.setItem('userId', userId);
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
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }
}

export default new AuthModel();
