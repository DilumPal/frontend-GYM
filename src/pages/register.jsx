import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister() {
        try {
            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users",
                {
                    email,
                    firstName,
                    lastName,
                    password,
                }
            );

            toast.success("Registration Successful");
            navigate("/login");
        } catch (e) {
            toast.error(
                e.response?.data?.message || "Registration Failed"
            );
        }
    }

    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-[url('/login.png')] bg-cover bg-center">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Left Side */}
            <div className="hidden md:block w-1/2 h-full"></div>

            {/* Register Section */}
            <div className="relative z-10 flex h-full w-full md:w-1/2 items-center justify-center px-6">
                <div
                    className="
                        flex
                        h-[650px]
                        w-[500px]
                        flex-col
                        items-center
                        justify-center
                        rounded-[24px]
                        border
                        border-white/15
                        bg-white/5
                        px-8
                        backdrop-blur-2xl
                        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                    "
                >
                    {/* Heading - Changed to Red (#E53935) */}
                    <h1 className="mb-2 text-4xl font-bold text-[#E53935]">
                        Create Account
                    </h1>

                    <p className="mb-8 text-[#EEEEEE]/70">
                        Register to get started
                    </p>

                    {/* First Name */}
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="
                            my-3
                            h-[55px]
                            w-[320px]
                            rounded-[15px]
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            text-[#EEEEEE]
                            backdrop-blur-md
                            outline-none
                            transition-all
                            placeholder:text-[#EEEEEE]/40
                            focus:border-[#E53935]
                            focus:ring-2
                            focus:ring-[#E53935]/30
                        "
                    />

                    {/* Last Name */}
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="
                            my-3
                            h-[55px]
                            w-[320px]
                            rounded-[15px]
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            text-[#EEEEEE]
                            backdrop-blur-md
                            outline-none
                            transition-all
                            placeholder:text-[#EEEEEE]/40
                            focus:border-[#E53935]
                            focus:ring-2
                            focus:ring-[#E53935]/30
                        "
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            my-3
                            h-[55px]
                            w-[320px]
                            rounded-[15px]
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            text-[#EEEEEE]
                            backdrop-blur-md
                            outline-none
                            transition-all
                            placeholder:text-[#EEEEEE]/40
                            focus:border-[#E53935]
                            focus:ring-2
                            focus:ring-[#E53935]/30
                        "
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                            my-3
                            h-[55px]
                            w-[320px]
                            rounded-[15px]
                            border
                            border-white/10
                            bg-white/5
                            px-4
                            text-[#EEEEEE]
                            backdrop-blur-md
                            outline-none
                            transition-all
                            placeholder:text-[#EEEEEE]/40
                            focus:border-[#E53935]
                            focus:ring-2
                            focus:ring-[#E53935]/30
                        "
                    />

                    {/* Register Button - Changed to Red (#E53935) & text to white */}
                    <button
                        onClick={handleRegister}
                        className="
                            mt-8
                            h-[55px]
                            w-[320px]
                            rounded-[15px]
                            bg-[#E53935]
                            font-bold
                            text-white
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                            hover:shadow-[0_0_25px_rgba(229,57,53,0.45)]
                        "
                    >
                        Register
                    </button>

                    {/* Login Link - Changed link colors to Red variants */}
                    <p className="mt-6 text-sm text-[#EEEEEE]/70">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="
                                cursor-pointer
                                text-[#E53935]
                                transition-colors
                                hover:text-[#ff4d4a]
                            "
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}