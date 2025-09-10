import axios from "axios"
import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";
export const useUserStore = create((set, get) => ({
    profile: {},
    user: {},
    loading: false,
    loading_rsvp_status: false,
    error: null,
    stats:null,
    formData: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        nsbe_id: null,
        membership_type: "",
        major: "",
        college_year: "",
        graduation_year: "",
        national_dues: "",
    },
    setPoints: (points) =>set({points}),
    setformData: (formData) => set({formData}),
    resetformData: () => set({
        formData: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            nsbe_id: null,
            membership_type: "",
            major: "",
            college_year: "",
            graduation_year: "",
            national_dues: "",
        }
    }),
    getUser: async () => {
        set({ loading: true });
        try {
            //configure to make sure it gets the users id
            const response = await api.get(`/members/1`)
            set({ user: response.data.data, error: null })
            // console.log(response.data.data);
        } catch (err) {
            console.log('error getting user: ', err);

        } finally {
            set({ loading: false });
        }
    },

    getProfile: async (id) => {
        set({ loading: true })

        try {
            const response = await api.get(`/members/profile/${id}`)
            set({ profile: response.data.data, error: null })

        } catch (err) {
            console.log('error getting user: ', err);
        } finally {
            set({ loading: false })
        }
    },
    getStats: async (id) =>{
        const {stats} = get()
        try{
            const response = await api.get(`members/stats/${id}`)
            set({stats: response.data.data})
            console.log(stats)
        }catch(err){
            console.log('error getting points: ', err)

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
    updateProfile: async (id) => {
        const {formData, getProfile} = get()
        set({ loading: true })
        try {
            const response = await api.put(`/members/${id}`, formData)
            toast.success('Profile updates');
            getProfile()
        } catch (err) {
            console.log(err)
            toast.error('something went wrong')
        }finally{
            set({loading:false})
        }
    },
    updateProfileImage: async(id,file) =>{
        const {getProfile} = get()
        const formData = new FormData()
        formData.append("imageFile", file);
        try{
            const response = await api.put(`members/image/${id}`, formData);
            toast.success('picture updated successfully')
            getProfile();
        }catch(err){
            console.log('error changing your picture: ', err)
            toast.error('something went wrong')
        }
    }

}))