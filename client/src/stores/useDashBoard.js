import axios from "axios"
import { create } from "zustand";

const BASE_URL = 'http://localhost:3000/api/members';
export const useDashBoard = create((set,get) =>({
    user: {},
    loading: false,
    error: null,

    getUser: async () => {
        set({loading: true});
        try{
            const response = await axios.get(`${BASE_URL}/1`)
            set({user: response.data.data, error: null})
            console.log(response.data.data);
        }catch(err){
            console.log('error getting user: ', err);

        }finally{
            set({loading: false});
        }
    }

}))