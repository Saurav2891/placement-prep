import './LoginPage.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import AuthController from '../src/auth/AuthController';
// const LoginPage = () => {
//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2>Login</h2>
//         <form>
//           <input type="email" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <button type="submit">Login</button>
//         </form>
//         <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
//       </div>
//     </div>
//   );
// };

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    // if (!email || !password) {
    //   setErrorMessage('Input fields are empty');
    //   return; // Exit the function
    // }
    console.log('Handling login...'); 
    try {
      const token = await AuthController.handleLogin(email, password);
      if(token === undefined){
        setErrorMessage("wrong credential")
        return;
      }
      setSuccessMessage('Successfully logged in.');
      setErrorMessage('');
      setEmail('');
      setPassword('');
      // console.log(token);
      navigate('/');
      // You can handle success, navigate to a new page, or update state here
    } catch (error) {
      console.log(error.response.data);
      // if (error.response) {
      //   // setErrorMessage(error.response.data);
      //   console.log(error.response.data);
      // } else {
      //   setErrorMessage('An error occurred. Please try again later.');
      // }
    }
  };
  const isLoginDisabled = !email || !password;
  return (
    <div className="login-page">
      <div className="login-container">
      <h2>Login</h2>
      <form>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <button onClick={handleLogin} disabled={isLoginDisabled}>
            Login
          </button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
      <p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
      
      </div>
    </div>
  );
};

export default LoginPage;