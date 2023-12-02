import './SignUpPage.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const SignUpPage = () => {
//   return (
//     <div className="signup-page">
//       <div className="signup-container">
//         <h2>Sign Up</h2>
//         <form>
//           <input type="text" placeholder="Full Name" />
//           <input type="email" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <input type="password" placeholder="Confirm Password" />
//           <button type="submit">Sign Up</button>
//         </form>
//         <p>Already have an account? <Link to="/login">Login</Link></p>
//       </div>
//     </div>
//   );
// };

const SignUpPage = () => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [college_name, setCollege_name] = useState('');
  const [domain, setDomain] = useState('');
  const [graduation_year, setGraduation_year] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/', {first_name,last_name,mobile,college_name,domain,email,graduation_year,password });
      console.log(response.data.message);
      setSuccessMessage(response.data.message);
      clearFormFields();
      // window.location.reload();
      // You can handle success, navigate to a new page, or update state here
      navigate('/login');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const clearFormFields = () => {
    setFirst_name('');
    setLast_name('');
    setMobile('');
    setCollege_name('');
    setDomain('');
    setEmail('');
    setGraduation_year('');
    setPassword('');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
      <h2>Sign Up</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form>
      <input
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={(e) => setFirst_name(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setLast_name(e.target.value)}
      />
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
      <input
        type="text"
        placeholder="Phone Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <input
        type="text"
        placeholder="College Name"
        value={college_name}
        onChange={(e) => setCollege_name(e.target.value)}
      />
      <input
        type="text"
        placeholder="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <input
        type="text"
        placeholder="Graduation Year"
        value={graduation_year}
        onChange={(e) => setGraduation_year(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};




export default SignUpPage;