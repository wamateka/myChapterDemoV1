import axios from "axios"
import { create } from "zustand";
import api from "../api.js";
export const useBlogStore = create((set,get)=>({
    blogs: [],
    loading: false,
    error: null,

    fetchBlogs: async () => {
        set({loading: true })
        try{
            const response = await api.get('/blogs');
            set({blogs: response.data.data  , error: null});
            console.log("fecthed blogs: ", response.data.data)
        }catch(err){
            console.log("error fetching blog Data: ", err);
            set({error: err})
        }finally{
            set({loading: false});
        }
    }


}))