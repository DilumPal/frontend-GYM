import { createClient } from "@supabase/supabase-js"

const url = "https://tgjwaeillwyegfbedncz.supabase.co"
const key = "sb_publishable_JVa5CScXg6670BEjzYK4zw_yzL_uM8-"

const supabase = createClient(url, key)

export default function meadiaUpload(file) {
    const meadiaUploadPromise = new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No file selected")
                return
            }

            const timestamp = new Data().getTime()
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