import axios from "axios";
import { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        console.log(email);
        console.log(password);

        try {
            const response = await axios.post("http://localhost:3000/users/login", {
                email: email,
                password: password
            })
            console.log(response)
        } catch (e) {
            console.log("error");
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
                        className="w-[300px] h-[50px] border border-white rounded-[20px] my-[20px]" />
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        type="password" className="w-[300px] h-[50px] border border-white rounded-[20px] mb-[20px]" />
                    <button onClick={handleLogin} className="w-[300px] h-[50px] cursor-pointer bg-gray-400 rounded-[20px] text-[20px] font-bold my-[20px]">Login</button>
                </div>

            </div>
        </div>
    )
}