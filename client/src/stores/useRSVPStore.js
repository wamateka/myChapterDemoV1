import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";
export const useRSVPStores = create((set,get)=>({
    rsv_list : [],
    getRSVPList : async(id)=> {
        try{
            const response = await api.get(`/rsvp/event/id`) 
        }catch{

        }
    }
}))