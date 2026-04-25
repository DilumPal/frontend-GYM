import { createClient } from "@supabase/supabase-js";
import { useState } from "react"

export default function TestPage(){

    const [image, setImage] = useState(null);

    const url = "https://tgjwaeillwyegfbedncz.supabase.co"
    const key = "sb_publishable_JVa5CScXg6670BEjzYK4zw_yzL_uM8-"

    const supabase = createClient(url, key)

    function fileUpload(){
        supabase.storage.from("images").upload(image.name, image, {
            upsert:false,
            casheControl:"3600"
        }).then(()=>{

            const publicUrl = supabase.storage.from("images").getPublicUrl(image.name).data.publicUrl
            console.log(publicUrl);

        }).catch((e)=>{
            console.log(e);
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