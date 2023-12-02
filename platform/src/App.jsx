import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import FooterSection from './components/FooterSection';
import CardSection from './components/CardSection';
import LoginPage from './LoginPage'; 
import SignUpPage from './SignUpPage'; 
import BeginnerPage from './dashboard/beginner';
import IntermediatePage from './dashboard/intermediate';
import AdvancedPage from './dashboard/advanced';
import ExpertPage from './dashboard/expert';
import AuthController from './auth/AuthController';
import { Navigate } from 'react-router-dom';
import './App.css';
import TestPage from './testpage/testpage';
import ProfilePage from './components/ProfilePage';

function ProtectedRoute({ element: Element }) {
  if (AuthController.isLoggedIn()) {
    return <Element />;
  } else {
    window.alert("You don't have permission to view this page");
    return <Navigate to="/login" />;
  }
}

function App() {
  return (

<Router>
  <div className="App">
  <div className="content-wrapper">
    <NavigationBar />
    <div className='page-container'>
    <Routes> {/* Use Routes component to wrap your Route components */}
      <Route path="/" element={<div><HeroSection /><CardSection /></div>} />
      <Route path="/login" element={<LoginPage  />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProtectedRoute element={ProfilePage} />} />
      <Route path="/beginner" element={<ProtectedRoute element={BeginnerPage}/>}/>
      <Route path="/intermediate" element={<ProtectedRoute element={IntermediatePage}/>} />
      <Route path="/advanced" element={<ProtectedRoute element={AdvancedPage}/>} />
      <Route path="/expert" element={<ProtectedRoute element={ExpertPage}/>} />
      <Route path="/testpage" element={<ProtectedRoute element={TestPage}/>} />
    </Routes>
    </div>
    </div>
    <FooterSection/>
  </div>
</Router>
  );
}

export default App;