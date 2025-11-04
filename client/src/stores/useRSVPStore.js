import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";
export const useRSVPStore = create((set,get)=>({
    rsv_list : [],
    // loading_rsvp_status: false,
    getRSVPList : async(id)=> {
        try{
            const response = await api.get(`/rsvp/event/id`) 
        }catch{

        }
    },
    getEventRsvpStatus: async(member_id, event_id) => {
        set({loading_rsvp_status: true})
        try{
            const response = await api.get(`/rsvp/status?member_id=${member_id}&event_id=${event_id}`)
            return response.data.data.status
        }catch(err){
            console.log("error getting rsvp status: ", err)
            return false
        }finally{
            set({loading_rsvp_status: false})
        }
    },
    setMemberRsvpStatus: async(member_id, event_id, status)=>{
        set({loading_rsvp_status: true})
        try{
            const response = await api.post(`/rsvp/status`, {member_id, event_id, status})
            return response.data.data
        } finally {
            set({loading_rsvp_status: false})
        }
    }
}))