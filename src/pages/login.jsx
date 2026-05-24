import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate("");

    const googleLogin = useGoogleLogin({
        onSuccess: (response)=>{
            const accessToken = response.access_token
            axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login/google", {
                accessToken: accessToken
            }).then((response)=>{
                toast.success("Login successful")
                const token = response.data.token
                localStorage.setItem("token", token)
                if(response.data.role === "admin"){
                    navigate("/adminPage")
                }else{
                    navigate("/")
                }
            })
        }
    })

    async function handleLogin() {

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
                email: email,
                password: password
            })
            //alert("Login Successful");
            toast.success("Login Successful")
            console.log(response.data);
            localStorage.setItem("token", response.data.token)

            if (response.data.role == "admin") {
                navigate("/adminPage")
            } else {
                navigate("/")
            }
        } catch (e) {
            //alert(e.response.data.message);
            toast.error(e.response.data.message);
        }

    }

    return (
        <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex justify-center items-center">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        placeholder="Email"
                        className="w-[300px] h-[50px] text-secondary border border-white rounded-[20px] my-[20px] px-4" />
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-[300px] h-[50px] text-secondary border border-white rounded-[20px] my-[20px] px-4" />
                    <button onClick={handleLogin} className="w-[300px] h-[50px] cursor-pointer bg-gray-400 rounded-[20px] text-[20px] font-bold my-[20px]">Login</button>
                    <button onClick={googleLogin} className="group relative flex w-[300px] h-[55px] items-center justify-center gap-3 overflow-hidden rounded-[15px] border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <GrGoogle className="text-2xl text-gray-700 transition-colors group-hover:text-gray-500" />
                        <span className="text-lg font-semibold text-gray-700 transition-colors group-hover:text-gray-500">
                            Login With Google
                        </span>
                    </button>
                </div>

            </div>
        </div>
    )
}