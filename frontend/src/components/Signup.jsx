import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, first_name, last_name, password, password2 } = formData;
    
    if (!email || !first_name || !last_name || !password || !password2) {
      setError("All fields are required");
      return;
    }
    else{
        const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
        if (response.status === 201) {
            navigate("/verify");
            toast.success(response.data.message);
          }
    }
    
  };

  return (
    <section className="signup-section">
      <div className="signup-header">
        <h2>Create Account</h2>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <p className="">{error}</p>}
        
        <div className="">
          <label htmlFor="email" className="">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            className="" 
            value={formData.email} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="">
          <label htmlFor="first_name" className="">First Name</label>
          <input 
            type="text" 
            id="first_name"
            name="first_name"
            className="" 
            value={formData.first_name} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="">
          <label htmlFor="last_name" className="">Last Name</label>
          <input 
            type="text" 
            id="last_name"
            name="last_name"
            className="" 
            value={formData.last_name} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="">
          <label htmlFor="password" className="">Password</label>
          <input 
            type="password" 
            id="password"
            name="password"
            className="" 
            value={formData.password} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="">
          <label htmlFor="password2" className="">Repeat Password</label>
          <input 
            type="password" 
            id="password2"
            name="password2"
            className="" 
            value={formData.password2} 
            onChange={handleOnChange}
          />
        </div>
        
        <input type="submit" value="Submit" className="submit-button" />
      </form>
      
      <h3 className="">or</h3>
      
      <div className="">
        <button className="">Sign Up with Google</button>
        <button className="">Sign Up with GitHub</button>
      </div>
    </section>
  );
}
