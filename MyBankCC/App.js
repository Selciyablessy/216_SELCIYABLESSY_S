import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactUs from './components/ContactUs';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashone from './components/Dashone';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import Transaction from './components/Transaction';
import Acountpage from './components/Acountpage';
import Acdetails from './components/Acdetails';
import VerificationPage from './components/VerificationPage';
import SettingsPage from './components/SettingsPage';
import Vs from './components/Vs';
const App = () => {
  const [formType, setFormType] = useState(null); // 'login' or 'signup'
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  return (
    <Router>
      <div
        style={{
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          backgroundImage: 'url("https://datarespons.com/wp-content/uploads/Digital-banking-scaled.jpg")',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
      {/* Routes for different pages */}
      
        <Routes>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/dash-one" element={<Dashone />} />
          <Route path="/" element={<HomePage setFormType={setFormType}/>} />
          <Route path="/about-us" element={<AboutPage/>} />
          <Route path="/contact-us" element={<ContactUs/>} />

          <Route path='/vs' element={<Vs/>}/>
          <Route path="/transaction" element={<Transaction/>}/>
          <Route path="/acount" element={<Acountpage/>}/>
          <Route path="/acdet" element={<Acdetails/>}/>

        </Routes>

      
        {/* Ensure forms are displayed above the background */}
        {(formType === 'login' || formType === 'signup' || isForgotPassword) && (
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2, // Ensure form is above the background
            }}
          >
            {formType === 'login' && !isForgotPassword && (
              <LoginPage setFormType={setFormType} setIsForgotPassword={setIsForgotPassword} />
            )}
            {formType === 'signup' && !isForgotPassword && (
              <SignupPage setFormType={setFormType} />
            )}
            {isForgotPassword && (
              <ForgotPasswordPage setIsForgotPassword={setIsForgotPassword} />
            )}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
