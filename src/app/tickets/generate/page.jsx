'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function GenerateTicketPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    nationality: '',
    plan: 'KIN - Regular Package',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  // Fixed password
  const FIXED_PASSWORD = 'ool2025admin';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError(null);
    if (password === FIXED_PASSWORD) {
      setIsUnlocked(true);
    } else {
      setPasswordError('Incorrect password');
      setPassword('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/generate-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error generating ticket');
      }

      setSuccess('Ticket generated and sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        dob: '',
        nationality: '',
        plan: 'KIN - Regular Package',
      });
    } catch (err) {
      setError(err.message || 'Error generating ticket');
    } finally {
      setLoading(false);
    }
  };

  // Password-protected form
  if (!isUnlocked) {
    return (
      <div className="container">
        <h1>Restricted Access - OOL Retreats 2025</h1>
        <p>Enter the password to access the ticket generator.</p>
        <form onSubmit={handlePasswordSubmit} className="form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit">Unlock</button>
        </form>
        {passwordError && <p className="error">{passwordError}</p>}

        <style jsx>{`
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #f2e2c6;
            color: #000000;
            font-family: 'Arial', sans-serif;
            text-align: center;
            padding: 20px;
          }
          h1 {
            color: #9f9668;
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.2rem;
            margin: 0.5rem 0;
          }
          .form {
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            text-align: left;
          }
          label {
            font-size: 1.1rem;
            color: #9f9668;
            margin-bottom: 0.5rem;
          }
          input {
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #9f9668;
            border-radius: 4px;
            outline: none;
          }
          input:focus {
            border-color: #8a8257;
          }
          button {
            background-color: #9f9668;
            color: #ffffff;
            border: none;
            padding: 12px 24px;
            font-size: 1.1rem;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1rem;
            transition: background-color 0.3s, transform 0.2s;
          }
          button:hover {
            background-color: #8a8257;
            transform: scale(1.05);
          }
          .error {
            color: #d32f2f;
            background-color: #ffe6e6;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
          }
        `}</style>
      </div>
    );
  }

  // Ticket generation form
  return (
    <div className="container">
      <h1>Generate Ticket - OOL Retreats 2025</h1>
      <p>Complete the form to generate and send a ticket to the user.</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Enter nationality"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plan">Plan</label>
          <select id="plan" name="plan" value={formData.plan} onChange={handleChange} required>
            <option value="KIN - Regular Package">KIN - Regular Package</option>
            <option value="HA - VIP Package">HA - VIP Package</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate and Send Ticket'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <Link href="/tickets">Back to tickets page</Link>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f2e2c6;
          color: #000000;
          font-family: 'Arial', sans-serif;
          text-align: center;
          padding: 20px;
        }
        h1 {
          color: #9f9668;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          margin: 0.5rem 0;
        }
        .form {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        label {
          font-size: 1.1rem;
          color: #9f9668;
          margin-bottom: 0.5rem;
        }
        input,
        select {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #9f9668;
          border-radius: 4px;
          outline: none;
        }
        input:focus,
        select:focus {
          border-color: #8a8257;
        }
        button {
          background-color: #9f9668;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.3s, transform 0.2s;
        }
        button:hover {
          background-color: #8a8257;
          transform: scale(1.05);
        }
        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .error {
          color: #d32f2f;
          background-color: #ffe6e6;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .success {
          color: #388e3c;
          background-color: #e8f5e9;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem 0;
        }
        a {
          color: #9f9668;
          text-decoration: none;
          font-size: 1.1rem;
          margin-top: 1rem;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}