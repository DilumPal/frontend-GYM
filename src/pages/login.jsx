export default function LoginPage(){
    return(
        <div className="w-full h-screen bg-green-900 flex flex-col justify-center items-center">
            <h1 className="text-4xl text-white mb-8">Login</h1>
            <input type="text" placeholder="Username" className="mb-4 p-2 rounded"/>
            <input type="password" placeholder="Password" className="mb-4 p-2 rounded"/>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </div>
    )
}