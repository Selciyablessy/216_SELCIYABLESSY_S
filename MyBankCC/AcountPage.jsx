import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AcountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountHolder, setAccountHolder] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [successPopup, setSuccessPopup] = useState(false); // State for the success popup

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedName = localStorage.getItem('userName');
      try {
        const response = await axios.get('http://localhost:3000/userlog');
        const currentUser = response.data.find(user => user.username === storedName);
        if (currentUser) {
          setUsername(currentUser.username);
          setAccountHolder(currentUser.username);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }

      const storedBalance = localStorage.getItem('balance');
      const parsedBalance = parseFloat(storedBalance) || 0;
      setBalance(parsedBalance);
      if (parsedBalance === 0) {
        setMessage("No balance available. Please deposit funds.");
      }
    };

    fetchUserDetails();

    // Check if the popup should be shown based on the state from navigation
    if (location.state?.transactionSuccessful) {
      setSuccessPopup(true);
    }
  }, [location.state]);

  const updateTransaction = async (type, amount) => {
    try {
      await axios.post('http://localhost:3008/trans', {
        username,
        type,
        amount,
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeposit = () => {
    if (amount <= 0) {
      setMessage("Deposit amount must be positive.");
      return;
    }

    const newBalance = balance + parseFloat(amount);
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance);
    updateTransaction('deposit', amount); // Log the deposit transaction
    setAmount('');
    alert('Proceed for Successful Payment');
    navigate('/verification', { state: { username, isSignup: false, from: '/acdet', type: 'deposit', amount } });
  };

  const handleWithdraw = () => {
    if (amount <= 0) {
      setMessage("Withdrawal amount must be positive.");
      return;
    }
    if (balance === 0) {
      setMessage("No balance available. Please deposit funds.");
      return;
    }
    if (amount > balance) {
      setMessage("Insufficient funds.");
      return;
    }

    const newBalance = balance - parseFloat(amount);
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance);
    updateTransaction('withdraw', amount); // Log the withdrawal transaction
    setAmount('');
    alert('Proceed for Successful Payment');
    navigate('/verification', { state: { username, isSignup: false, from: '/acdet', type: 'withdraw', amount } });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setMessage('');
  };

  const closePopup = () => {
    setSuccessPopup(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1>Bank Account Details</h1>
        <p><strong>Account Holder:</strong> {accountHolder}</p>
        <p><strong>Current Balance:</strong> Rs.{balance}</p>

        <div style={styles.inputContainer}>
          <label>
            Amount: 
            <input 
              type="number" 
              value={amount}
              onChange={handleAmountChange}
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={handleDeposit} style={styles.button}>Deposit</button>
          <button 
            onClick={handleWithdraw} 
            style={styles.button} 
            disabled={balance === 0} // Disable if balance is zero
          >
            Withdraw
          </button>
          <button onClick={() => navigate('/dash-one')} style={styles.button}>Back</button>
        </div>
        
        {message && <p style={styles.message}>{message}</p>}
      </div>

      {successPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <span style={styles.close} onClick={closePopup}>&times;</span>
            <h2 style={{ color: 'green' }}>Success!</h2>
            <p>Your transaction was successful.</p>
            <span style={styles.checkmark}>✔</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  box: {
    padding: '20px',
    maxWidth: '400px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'aliceblue',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '10px',
  },
  input: {
    marginLeft: '10px',
  },
  buttonContainer: {
    marginTop: '10px',
  },
  button: {
    marginRight: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'red',
  },
  popup: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popupContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '20px',
  },
  checkmark: {
    fontSize: '40px',
    color: 'green',
    display: 'block',
    marginTop: '10px',
  },
};

export default AcountPage;
