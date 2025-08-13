import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../api';

export const useGalleryStore = create((set, get) => ({
    laoding: false,
    gallery: [],
    error: null,

    fetchGallery: async () =>{
        set({laoding: true})
        try{
            const response = await api.get('gallery/')
            set({gallery: response.data.data, error: null})
        }catch(err){
            console.log('error fecthing the gallery: ', err)
        }finally{
            set({loading: false})
        }
    }
}))