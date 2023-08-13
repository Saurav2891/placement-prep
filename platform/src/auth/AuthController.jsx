import AuthModel from './AuthModel';

class AuthController {
  async handleLogin(email, password) {
    return AuthModel.login(email, password);
  }

  handleLogout() {
    AuthModel.logout();
  }

  checkAuthentication() {
    return AuthModel.isAuthenticated();
  }
}

export default new AuthController();
