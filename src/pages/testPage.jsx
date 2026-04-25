import { createClient } from "@supabase/supabase-js";
import { useState } from "react"
import meadiaUpload from "../utils/meadiaUpload";

export default function TestPage(){

    const [image, setImage] = useState(null);


    function fileUpload(){
        meadiaUpload(image).then(
            (res)=>{
                console.log(res)
            }
        ).catch(
            (res)=>{
                console.log(res)
        })
    }

    return(
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <input type="file" className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e)=>{
                setImage(e.target.files[0])
            }}/>
            <button onClick={fileUpload} className="bg-green-400 text-white font-bold py-2 px-4 rounded">Upload</button>
        </div>
    )
}