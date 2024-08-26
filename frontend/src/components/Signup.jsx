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
    <section className="max-w-3xl mx-auto my-40 bg-gray-100">
      <div className="">
        <h2 className='text-3xl font-light text-center first-letter:capitalize'>create account</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center px-10 py-6 bg-white ">
        {error && <p className="">{error}</p>}
        
        <div className="flex flex-col mt-2">
          <label htmlFor="email" className="mb-2 text-gray-800">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            className="px-6 py-3 rounded-lg " 
            value={formData.email} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col mt-2">
          <label htmlFor="first_name" className="mb-2 text-gray-800">First Name</label>
          <input 
            type="text" 
            id="first_name"
            name="first_name"
            className="px-6 py-3 rounded-lg" 
            value={formData.first_name} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col mt-2">
          <label htmlFor="last_name" className="mb-2 text-gray-800">Last Name</label>
          <input 
            type="text" 
            id="last_name"
            name="last_name"
            className="px-6 py-3 rounded-lg" 
            value={formData.last_name} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="mb-2 text-gray-800">Password</label>
          <input 
            type="password" 
            id="password"
            name="password"
            className="px-6 py-3 rounded-lg" 
            value={formData.password} 
            onChange={handleOnChange}
          />
        </div>
        
        <div className="flex flex-col mt-2">
          <label htmlFor="password2" className="mb-2 text-gray-800">Repeat Password</label>
          <input 
            type="password" 
            id="password2"
            name="password2"
            className="px-6 py-3 rounded-lg" 
            value={formData.password2} 
            onChange={handleOnChange}
          />
        </div>
        
        <input type="submit" value="Submit" className="w-1/3 px-6 py-3 mx-auto mt-2 text-white bg-teal-700 rounded-lg" />
      </form>
      
      <h3 className="">or</h3>
      
      <div className="">
        <button className="">Sign Up with Google</button>
        <button className="">Sign Up with GitHub</button>
      </div>
    </section>
  );
}
