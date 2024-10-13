// src/components/SettingsPage.js
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Ensure this import works
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SettingsPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('John Doe'); // Default name
  const [email, setEmail] = useState('john.doe@example.com'); // Default email
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [privacy, setPrivacy] = useState('public'); // 'public' or 'private'
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePasswordClick = () => {
    setShowChangePasswordForm(true);
    setEmailSent(false); // Reset email sent status
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Here you would typically send a request to your API to send the email
    setEmailSent(true); // Simulate sending an email
  };

  const handleCancel = () => {
    setShowChangePasswordForm(false);
    setEmailSent(false); // Clear email sent status
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '10px', maxWidth: '800px', margin: 'auto', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', marginBottom: '20px' }}>
        <FaArrowLeft />
      </button>

      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Account Settings</h2>

      <form style={{ marginBottom: '20px' }}>
        <h3>Edit Profile</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', width: '100%' }}
            />
          </label>
        </div>

        <h3>Notification Preferences</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
            Receive Email Notifications
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
            />
            Receive SMS Notifications
          </label>
        </div>

        <h3>Account Privacy</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="radio"
              value="public"
              checked={privacy === 'public'}
              onChange={() => setPrivacy('public')}
            />
            Public (Visible to others)
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              value="private"
              checked={privacy === 'private'}
              onChange={() => setPrivacy('private')}
            />
            Private (Only you can see)
          </label>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="button" onClick={handleChangePasswordClick} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
            Change Password
          </button>
        </div>
      </form>

      {showChangePasswordForm && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '10px' }}>
          <h4>Reset Password</h4>
          <form onSubmit={handlePasswordReset}>
            <p>A link has been sent to your email to reset your password.</p>
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Send Link
            </button>
            <button type="button" onClick={handleCancel} style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}>
              Cancel
            </button>
          </form>
          {emailSent && <p style={{ color: 'green' }}>Email sent successfully!</p>} {/* Email sent confirmation */}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
