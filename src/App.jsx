import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [message, setMessage] = useState('');

  const inputRef = useRef(null); // For focusing if needed

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(otp);
    setMessage('');
    setEnteredOtp('');
    inputRef.current?.focus(); // focus input after generation
  };

  const verifyOtp = () => {
    let resultWindow = window.open('', '_blank');
    if (parseInt(enteredOtp) === generatedOtp) {
      resultWindow.document.write(`
        <html>
          <head>
            <title>OTP Status</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #e6ffed;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
              .message {
                background-color: #d4edda;
                color: #155724;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0,0,0,0.1);
                font-size: 24px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="message">✅ OTP verification successful!</div>
          </body>
        </html>
      `);
    } else {
      resultWindow.document.write(`
        <html>
          <head>
            <title>OTP Status</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #ffe6e6;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
              .message {
                background-color: #f8d7da;
                color: #721c24;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0,0,0,0.1);
                font-size: 24px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="message">❌ Wrong OTP entered.</div>
          </body>
        </html>
      `);
    }
  };

  // 🔑 Pressing Enter triggers OTP verification
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        verifyOtp();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enteredOtp, generatedOtp]);

  return (
    <div style={styles.container}>
      <h1>OTP Verification</h1>
      <button onClick={generateOtp} style={styles.button}>Generate OTP</button>

      {generatedOtp && (
        <div style={{ marginTop: '10px' }}>
          <p><strong>Generated OTP:</strong> {generatedOtp}</p>
          <input
            ref={inputRef}
            type="number"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={verifyOtp} style={styles.button}>Verify OTP</button>
        </div>
      )}

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial',
    textAlign: 'center',
    marginTop: '10vh',
    padding: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px',
    fontSize: '16px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
  },
  message: {
    fontSize: '18px',
    marginTop: '10px',
  },
};

export default App;
