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
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
      if (response.status === 201) {
        navigate("/verify");
        toast.success(response.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="max-w-3xl px-6 py-10 mx-auto my-20 bg-gray-100 rounded-lg shadow-md">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Create an Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col p-8 space-y-4 bg-white rounded-lg shadow-md">
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm text-gray-700">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
            value={formData.email} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="first_name" className="mb-1 text-sm text-gray-700">First Name</label>
          <input 
            type="text" 
            id="first_name"
            name="first_name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
            value={formData.first_name} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="last_name" className="mb-1 text-sm text-gray-700">Last Name</label>
          <input 
            type="text" 
            id="last_name"
            name="last_name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
            value={formData.last_name} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm text-gray-700">Password</label>
          <input 
            type="password" 
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
            value={formData.password} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="password2" className="mb-1 text-sm text-gray-700">Repeat Password</label>
          <input 
            type="password" 
            id="password2"
            name="password2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
            value={formData.password2} 
            onChange={handleOnChange}
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full px-4 py-2 mt-4 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
          Sign Up
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="mb-4 text-gray-600">or sign up with:</p>
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Sign Up with Google
          </button>
          <button className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600">
            Sign Up with GitHub
          </button>
        </div>
      </div>
    </section>
  );
}
