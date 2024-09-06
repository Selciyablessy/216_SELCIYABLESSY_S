import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const HomePage = ({ setFormType }) => {
  return (
    <div>
      <nav
        style={{
          height: '40px',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'black',
          padding: '10px',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'space-around',
          textDecoration: 'none',
          margin: 0,
        }}
      >
        <Link href="/" style={{textDecoration: 'none', color: 'aliceblue' }}>
          <h3>MyBank</h3>
        </Link>
        <Link href="/dash-one" onClick={(e) => {
            e.preventDefault();
            setFormType('login');
          }}
          style={{ textDecoration: 'underline', color: 'aliceblue',}}
        >
          <h3>Login</h3>
        </Link>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setFormType('signup');
          }}
          style={{ textDecoration: 'underline', color: 'aliceblue' }}
        >
          <h3>Signup</h3>
        </Link>
        <Link href="/about-us" style={{ textDecoration: 'none', color: 'aliceblue' }}>
          <h3>About Us</h3>
        </Link>
        <Link href="/contact-us" style={{ textDecoration: 'none', color: 'aliceblue' }}>
          <h3>ContactUs</h3>
        </Link>
      </nav>

      <Typography
        variant="h2"
        component="div"
        sx={{

          position: 'absolute',
          top: '25%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          color: 'lightblue',
          textAlign: 'center',
          zIndex: 1,
          fontSize:'2cm',
          padding: '20px',
          borderRadius: '8px',
          fontFamily:'colonna MT',
        }}
      >
        Welcome to MyBank
      </Typography>
    </div>
  );
};

export default HomePage;
