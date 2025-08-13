import axios from "axios"
import { create } from "zustand";
import api from "../api";
export const useDashBoard = create((set,get) =>({

    user: {},
    loading: false,
    error: null,

    getUser: async () => {
        set({loading: true});
        try{
            //configure to make sure it gets the users id
            const response = await api.get(`/members/1`)
            set({user: response.data.data, error: null})
            console.log(response.data.data);
        }catch(err){
            console.log('error getting user: ', err);

        }finally{
            set({loading: false});
        }
    }

}))