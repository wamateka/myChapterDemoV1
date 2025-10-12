import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";
export const useMemberStore = create((set,get) => ({
    loading: false,
    membersList: [],
    memberCount: 0,
    getMemberList: async() =>{
        set({loading: true})
        try{
            const res = await api.get("/members/list")
            set({membersList: res.data.data})
        }catch(err){
            console.log(err)
        }finally{
            set({loading: false})
        }
    },
    getMemberCount: async () =>{
        try{
            const res = await api.get("/members/count");
            console.log(res.data.data.count)
            set({member_count: res.data.data.count})
        }catch(err){
            console.log(err);
        }
    }
}))