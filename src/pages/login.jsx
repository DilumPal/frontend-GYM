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
                        border-secondary/15
                        bg-secondary/5
                        px-8
                        backdrop-blur-2xl
                        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                    "
                >
                    {/* Heading - Swapped to Accent */}
                    <h1 className="mb-2 text-4xl font-bold text-accent">
                        Welcome Back
                    </h1>

                    <p className="mb-10 text-secondary/70">
                        Sign in to continue
                    </p>

                    {/* Email Input */}
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
                            border-secondary/10
                            bg-secondary/5
                            px-4
                            text-secondary
                            backdrop-blur-md
                            outline-none
                            transition-all
                            placeholder:text-secondary/40
                            focus:border-accent
                            focus:ring-2
                            focus:ring-accent/30
                        "
                    />

                    {/* Password Input */}
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
                            border-secondary/10
                            bg-secondary/5
                            px-4
                            text-secondary
                            backdrop-blur-md
                            outline-none
                            transition-all
                            placeholder:text-secondary/40
                            focus:border-accent
                            focus:ring-2
                            focus:ring-accent/30
                        "
                    />

                    {/* Login Button - Swapped to Accent */}
                    <button
                        onClick={handleLogin}
                        className="
                            mt-6
                            mb-4
                            h-[55px]
                            w-[320px]
                            rounded-[15px]
                            bg-accent
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
                        <div className="h-px flex-1 bg-secondary/10"></div>
                        <span className="px-3 text-sm text-secondary/50">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-secondary/10"></div>
                    </div>

                    {/* Google Login Button - Handles hover/ring states with theme color */}
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
                            border-secondary/10
                            bg-secondary/5
                            backdrop-blur-md
                            transition-all
                            duration-300
                            hover:border-accent
                            hover:bg-secondary/10
                            hover:shadow-[0_0_20px_rgba(229,57,53,0.15)]
                        "
                    >
                        <GrGoogle className="text-xl text-secondary" />

                        <span className="font-semibold text-secondary">
                            Continue with Google
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}