import axios from "axios"
import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";
export const useUserStore = create((set, get) => ({
    profile: {},
    user: {},
    loading: false,
    error: null,
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