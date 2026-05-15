import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function sendOtp() {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp", {
      email: email,
    })
    .then((response) => {
      setOtpSent(true);
      toast.success("OTP sent to your email, Check your inbox");
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    });
  }

  function verifyOtp() {
    const otpNumberFormatted = parseInt(otp, 10);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
      email: email,
      otp: otpNumberFormatted,
      newPassword: newPassword,
    })
    .then((response) => {
      toast.success("Password reset successfully!");
      // Optionally redirect user to login here
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid OTP or request failed");
    });
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex justify-center items-center">
      {otpSent ? (
        /* OTP & Password Reset Section */
        <div key="otp-form" className="w-[400px] h-[500px] bg-white rounded-lg flex flex-col items-center justify-center gap-4 p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-2">Reset Your Password</h2>
          
          <input 
            type="text" 
            placeholder="Enter OTP" 
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)} 
            autoComplete="one-time-code"
          />
          
          <input 
            type="password" 
            placeholder="New password" 
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
          
          <input 
            type="password" 
            placeholder="Confirm new password" 
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          
          <button 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 font-semibold" 
            onClick={verifyOtp}
          >
            Verify & Reset Password
          </button>
          
          <button 
            className="text-gray-500 text-sm hover:underline" 
            onClick={() => setOtpSent(false)}
          >
            Entered wrong email? Go back
          </button>
        </div>
      ) : (
        /* Email Request Section */
        <div key="email-form" className="w-[400px] h-[500px] bg-white rounded-lg flex flex-col items-center justify-center gap-4 p-6 shadow-xl">
          <h2 className="text-xl font-bold mb-2">Forgot Password</h2>
          <p className="text-gray-600 text-center text-sm mb-2">Enter your email to receive a verification code.</p>
          
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <button 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 font-semibold" 
            onClick={sendOtp}
          >
            Send OTP
          </button>
        </div>
      )}
    </div>
  );
}