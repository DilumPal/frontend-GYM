import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <header className="w-full h-[80px] shadow-2xl flex" >
            <img src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer top-0 left-0 m-2" />
            <div className="w-[calc(100%-160px)] h-full bg-green-600">
                
            </div>
            <div className="w-[80px] bg-green-300">

            </div>
        </header>
    )
}