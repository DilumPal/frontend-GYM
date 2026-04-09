import UserData from "./userData";

export default function Header(){
    return(
        <div className="Header bg-red-300" >
            <h1 className="font-bold text-blue-700">GYMNASIUM</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi, maiores dicta deserunt, placeat doloribus vitae ratione ad facere saepe eos nostrum ducimus. Repudiandae saepe at deserunt quae, commodi maxime quam?</p>
            <UserData></UserData>
        </div>
    )
}