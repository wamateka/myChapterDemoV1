import axios from "axios"
import { create } from "zustand";

const BASE_URL = 'http://localhost:3000/api/blogs';
export const useBlogStore = create((set,get)=>({
    blogs: [],
    loading: false,
    error: null,

    fetchBlogs: async () => {
        set({loading: true })
        try{
            const response = await axios.get(BASE_URL);
            set({blogs: response.data.data  , error: null});
            console.log("fecthed blogs: ", response.data.data)
        }catch(err){
            console.log("error fetching blog Data: ", err);
            set({error: err})
        }finally{
            set({loading: true});
        }
    }


}))