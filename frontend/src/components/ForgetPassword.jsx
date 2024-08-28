import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email address is required");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/forgot-password/", { email });
      if (response.status === 200) {
        setSuccess("Password reset link sent to your email.");
        setEmail("");
        setError("");
      }
    } catch (err) {
      setError("Failed to send password reset link. Please try again.");
      setSuccess("");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Forgot Your Password?</h2>
        
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        {success && <p className="mb-4 text-center text-green-500">{success}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
}
