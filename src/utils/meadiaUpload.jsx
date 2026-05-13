import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(url, key)

export default function meadiaUpload(file) {
    const meadiaUploadPromise = new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No file selected")
                return
            }

            const timestamp = new Date().getTime()
            const newName = timestamp + file.name

            supabase.storage.from("images").upload(newName, file, {
                upsert: false,
                casheControl: "3600"
            }).then(() => {

                const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl);

            }).catch((e) => {
                reject("error occured in supabase connection");
            })
        }
    );

    return meadiaUploadPromise
}