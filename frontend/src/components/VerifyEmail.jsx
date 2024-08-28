import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError("OTP code is required");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify/", { otp });
      if (response.status === 200) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <section className="max-w-lg px-6 py-8 mx-auto my-20 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Enter Your OTP Code</h2>

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="flex flex-col">
          <label htmlFor="otp" className="text-gray-700">OTP Code</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter OTP code"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 mt-4 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Verify
        </button>
      </form>
    </section>
  );
}
