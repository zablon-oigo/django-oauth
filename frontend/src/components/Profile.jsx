import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
   const navigate=useNavigate()
   const user=JSON.parse(localStorage.getItem('user'))
   const jwt_access=localStorage.getItem('access')
   useEffect(()=>{
    if(jwt_access === null && !user){
      navigate("/login")
    }
   },[])

  return (
    <section className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="mb-2 text-3xl font-semibold">
          Hello, {user && user.full_name}
        </h2>
        <p className="mb-4 text-gray-600">Welcome back to your profile!</p>
        <button 
          className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
