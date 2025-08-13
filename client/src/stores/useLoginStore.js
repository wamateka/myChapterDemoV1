import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import { isEmail} from 'validator';
import api from '../api';
export const useLoginStore = create((set,get) => ({
    loading: false,
    formData: {
        email: '',
        password: ''
    },
    setformData: (formData) => set({formData}),
    loginUser: async() => {
        set({loading: true})
        const {formData} = get()
        try{
            await api.post('auth/login', formData);
            toast.success('logged in succesfully');
        }catch(err){
            console.log(err);
            toast.error('Invalid credentials!')
        }finally{
            set({loading:false})
        }
        
    }
}))