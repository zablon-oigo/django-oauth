import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, first_name, last_name, password, password2 } = formData;
    if (!email || !first_name || !last_name || !password || !password2) {
      setError("All fields are required");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    // Handle successful form submission here
    setError(""); // Clear error on successful submission
  };

  return (
    <section className="signup-section">
      <div className="signup-header">
        <h2>Create Account</h2>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <p className="error-message">
          {error}
        </p>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            className="form-input" 
            value={formData.email} 
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input 
            type="text" 
            id="first_name"
            name="first_name"
            className="form-input" 
            value={formData.first_name} 
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input 
            type="text" 
            id="last_name"
            name="last_name"
            className="form-input" 
            value={formData.last_name} 
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            id="password"
            name="password"
            className="form-input" 
            value={formData.password} 
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2" className="form-label">Repeat Password</label>
          <input 
            type="password" 
            id="password2"
            name="password2"
            className="form-input" 
            value={formData.password2} 
            onChange={handleOnChange}
          />
        </div>
        <input type="submit" value="Submit" className="submit-button" />
      </form>
      <h3 className="or-text">or</h3>
      <div className="signup-options">
        <button className="google-button">Sign Up with Google</button>
        <button className="github-button">Sign Up with GitHub</button>
      </div>
    </section>
  );
}
