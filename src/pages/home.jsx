export default function HomePage(){
    return(
        <div className="w-full h-screen bg-green-900 flex flex-col justify-center items-center">
            <h1 className="text-4xl text-white mb-8">Welcome to the Home Page</h1>
            <p className="text-white mb-4">This is the home page of our application.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Explore</button>
        </div>
    )
}