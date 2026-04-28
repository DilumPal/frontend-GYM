import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <div className="w-full h-[80px] shadow-2xl" >
            <img src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover absolute top-0 left-0 m-2" />
        </div>
    )
}