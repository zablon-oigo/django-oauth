import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const { email, password } = formData;
    
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
      if (response.status === 200) {
        navigate("/dashboard");
        toast.success("Login successful!");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <section className="max-w-lg px-6 py-10 mx-auto my-20 bg-white rounded-lg shadow-md">
      <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm text-gray-700">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
            value={formData.email} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm text-gray-700">Password</label>
          <input 
            type="password" 
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
            value={formData.password} 
            onChange={handleOnChange}
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full px-4 py-2 mt-4 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
          Login
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">Don't have an account? <a href="" className="text-teal-600 hover:underline">Sign up</a></p>
      </div>
    </section>
  );
}
