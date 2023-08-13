// import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HeroSection from './components/HeroSection';
import FooterSection from './components/FooterSection';
import CardSection from './components/CardSection';
import LoginPage from './LoginPage'; // Import the Login page
import SignUpPage from './SignUpPage'; 
import BeginnerPage from './dashboard/beginner';
import './App.css';

function App() {
  return (
    
    // <div className="App">
    //   <NavigationBar />
    //   <HeroSection />
    //   <CardSection />
    //   <FooterSection />
    //   <LoginPage /> 
    //   <SignUpPage />
    // </div>
  // <Router>
  //   <div className="App">
  //     <NavigationBar />
  //     <Switch>
  //       <Route path="/" exact>
  //         <HeroSection />
  //         <CardSection />
  //         <FooterSection />
  //       </Route>
  //       <Route path="/login" component={LoginPage} />
  //       <Route path="/signup" component={SignUpPage} />
  //       {/* <Route path="/signup">
  //         <SignUpPage />
  //       </Route> */}
  //     </Switch>
  //   </div>
  // </Router>

<Router>
  <div className="App">
    <NavigationBar />
    <Routes> {/* Use Routes component to wrap your Route components */}
      <Route path="/" element={<div><HeroSection /><CardSection /></div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/beginner" element={<BeginnerPage/>}/>
    </Routes>
    <FooterSection />
  </div>
</Router>
  );
}

export default App;