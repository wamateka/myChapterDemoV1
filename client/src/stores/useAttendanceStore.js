import axios from "axios"
import { create } from "zustand";
import api from "../api.js";

export const useAttendanceStore= create((set, get) =>({
    loading: false,
    attendances: [],
    eventAttendance: [],
    memberAttendance: [],
    error: null,
    fetchAttendances: async () =>{
        set({loading: true})
        try{
            const response = await api.get('/attendances/');
            set({attendances: response.data.data, error: null})
        }catch(err){
            console.log('error fetching attendances: ', err);
            set({error: err})
        }finally{
            set({loading: false})
        }
    },

    fetchEventAttendance: async(id) =>{
        set({loading: true})
        try{
            const response = await api.get(`/attendances/event/${id}`)
            set({eventAttendance: response.data.data , error: null})
            console.log('fetched event attendance records: ', response.data.data)
        }catch(err){
            console.log('error fetching attendancs: ', err)
        }finally{
            set({loading: false})
        }
    },

    fetchMemberAttendance: async(id) =>{
        set({loading: true})
        try{
            const response = await api.get(`/attendances/member/${id}`)
            set({memberAttendance: response.data.data , error: null})
            console.log('fetched member attendance records: ', response.data.data)
        }catch(err){
            console.log('error fetching attendancs: ', err)
        }finally{
            set({loading: false})
        }
    }
}))