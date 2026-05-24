import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate("");

    async function handleRegister() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users",
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                    // role, isBlocked, img → will take default values from schema
                }
            );

            toast.success("Registration Successful");

            navigate("/login");

        } catch (e) {
            toast.error(e.response?.data?.message || "Registration Failed");
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex justify-center items-center">
            
            <div className="w-[50%] h-full"></div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[650px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">

                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="First Name"
                        className="w-[300px] h-[50px] text-secondary border border-white rounded-[20px] my-[10px] px-4"
                    />

                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Last Name"
                        className="w-[300px] h-[50px] text-secondary border border-white rounded-[20px] my-[10px] px-4"
                    />

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        className="w-[300px] h-[50px] text-secondary border border-white rounded-[20px] my-[10px] px-4"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-[300px] h-[50px] text-secondary border border-white rounded-[20px] my-[10px] px-4"
                    />

                    <button
                        onClick={handleRegister}
                        className="w-[300px] h-[50px] cursor-pointer bg-gray-400 rounded-[20px] text-[20px] font-bold my-[20px]"
                    >
                        Register
                    </button>

                </div>
            </div>
        </div>
    );
}