// import React from 'react';
import './NavigationBar.css';
import { Link,useNavigate   } from 'react-router-dom'; 
import AuthController from '../auth/AuthController';
const NavigationBar = () => {

  const navigate = useNavigate(); 
  const isAuthenticated = AuthController.checkAuthentication();
  const handleLogout = () => {
    AuthController.handleLogout();
      navigate('/');
   
    // You might want to redirect to a specific page after logout
  };
  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/" className="logo-link">
          Placement Prep
        </Link>
      </div>
      <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
        <li><a href="#">Courses</a></li>
        <li><a href="#">Practice</a></li>
        <li><a href="#">About</a></li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
// eslint-disable-next-line