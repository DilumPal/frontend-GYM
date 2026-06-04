import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            const accessToken = response.access_token;

            axios
                .post(
                    import.meta.env.VITE_BACKEND_URL +
                        "/api/users/login/google",
                    {
                        accessToken,
                    }
                )
                .then((response) => {
                    toast.success("Login Successful");

                    localStorage.setItem("token", response.data.token);

                    if (response.data.role === "admin") {
                        navigate("/adminPage");
                    } else {
                        navigate("/");
                    }
                })
                .catch(() => {
                    toast.error("Google login failed");
                });
        },
    });

    async function handleLogin() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users/login",
                {
                    email,
                    password,
                }
            );

            toast.success("Login Successful");

            localStorage.setItem("token", response.data.token);

            if (response.data.role === "admin") {
                navigate("/adminPage");
            } else {
                navigate("/");
            }
        } catch (e) {
            toast.error(
                e?.response?.data?.message || "Login failed. Please try again."
            );
        }
    }

    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-[url('/login.png')] bg-cover bg-center">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Empty left side for desktop */}
            <div className="hidden md:block w-1/2 h-full"></div>

            {/* Login Section */}
            <div className="relative z-10 flex h-full w-full md:w-1/2 items-center justify-center px-6">
                <div
                    className="
                        flex
                        h-[600px]
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
                    {/* Heading - Changed from Green to Red (#E53935) */}
                    <h1 className="mb-2 text-4xl font-bold text-[#E53935]">
                        Welcome Back
                    </h1>

                    <p className="mb-10 text-[#EEEEEE]/70">
                        Sign in to continue
                    </p>

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

                    {/* Login Button - Changed from Green to Red (#E53935) */}
                    <button
                        onClick={handleLogin}
                        className="
                            mt-6
                            mb-4
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
                        Login
                    </button>

                    {/* Divider */}
                    <div className="my-5 flex w-[320px] items-center">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="px-3 text-sm text-[#EEEEEE]/50">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>

                    {/* Google Login - Changed hover effects to Red (#E53935) */}
                    <button
                        onClick={googleLogin}
                        className="
                            group
                            flex
                            h-[55px]
                            w-[320px]
                            items-center
                            justify-center
                            gap-3
                            rounded-[15px]
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-md
                            transition-all
                            duration-300
                            hover:border-[#E53935]
                            hover:bg-white/10
                            hover:shadow-[0_0_20px_rgba(229,57,53,0.15)]
                        "
                    >
                        <GrGoogle className="text-xl text-[#EEEEEE]" />

                        <span className="font-semibold text-[#EEEEEE]">
                            Continue with Google
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}