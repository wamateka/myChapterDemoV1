import dotenv from 'dotenv'

dotenv.config();

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function upload(file,fileName, folder) {
    const options = {
        folder: `nsbe/${folder}`,
        public_id: fileName,
        overwrite: true

    }
    const results = await cloudinary.uploader.upload(file, options)

    return results.url


    // return cloudinary.url(results.public_id, {
    //     transformation: [
    //         {
    //             quality: 'auto',
    //             fetch_format: 'auto'
    //         }
    //     ]
    // })
}