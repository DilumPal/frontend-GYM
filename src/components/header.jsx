import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <div className="Header bg-red-300" >
            <h1 className="font-bold text-blue-700">GYMNASIUM</h1>
            <Link href="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
        </div>
    )
}