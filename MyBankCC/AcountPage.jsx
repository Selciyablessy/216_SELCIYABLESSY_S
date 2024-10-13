import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AcountPage = () => {
  const navigate = useNavigate();
  const [accountHolder, setAccountHolder] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedBalance = localStorage.getItem('balance');
    setAccountHolder(storedName || 'Guest');
    setBalance(parseFloat(storedBalance) || 0);
  }, []);

  const handleDeposit = () => {
    if (amount <= 0) {
      setMessage("Deposit amount must be positive.");
      return;
    }

    const newBalance = balance + parseFloat(amount);
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance); // Update balance in localStorage
    setMessage(`Deposited Rs.${amount}. New balance is Rs.${newBalance}.`);
    setAmount(''); // Clear amount after deposit
  };

  const handleWithdraw = () => {
    if (amount <= 0) {
      setMessage("Withdrawal amount must be positive.");
      return;
    }
    if (amount > balance) {
      setMessage("Insufficient funds.");
      return;
    }

    const newBalance = balance - parseFloat(amount);
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance); // Update balance in localStorage
    setMessage(`Withdrew Rs.${amount}. New balance is Rs.${newBalance}.`);
    setAmount(''); // Clear amount after withdrawal
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setMessage(''); // Clear message when amount changes
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
          <button onClick={handleWithdraw} style={styles.button}>Withdraw</button>
          <button onClick={() => navigate('/dash-one')} style={styles.button}>Back</button>
        </div>
        
        {message && <p style={styles.message}>{message}</p>}
      </div>
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
};

export default AcountPage;
