import { useState } from "react"

export default function ForgetPasswordPage(){
    const[otpSent, setOtp] = useState(false)
    const[email, setEmail] = useState("")
    const[otp, setOtp] = useState("")
    const[newPassword, setNewPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    return(
        <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex justify-center items-center">
            {
                otpSent?
                <div className="w-[400px] h-[500px] bg-white rounded-lg flex flex-col items-center justify-center gap-4">
                    <input className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter OTP"/>
                </div>:
                <div className="w-[400px] h-[500px] bg-white rounded-lg flex flex-col items-center justify-center gap-4">

                </div>
            }
        </div>
    )
}