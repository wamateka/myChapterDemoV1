import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../api";

export const useGalleryStore = create((set, get) => ({
    uploading: false,
    laoding: false,
    gallery: [],
    error: null,

    formData: {
        memberId: null,
        imageFile: null,
        caption: "",
    },
    setFormData: (formData) => set({ formData }),
    resetFormData: () => (
        set({
            formData: {
                memberId: null,
                imageFile: null,
                imageFilePath: "",
                caption: "",
            }
        })
    ),

    fetchGallery: async () => {
        set({ laoding: true });
        try {
            const response = await api.get("gallery/");
            set({ gallery: response.data.data, error: null });
        } catch (err) {
            console.log("error fecthing the gallery: ", err);
        } finally {
            set({ loading: false });
        }
    },
    uploadImage: async () => {
        set({ uploading: true });
        const { formData,fetchGallery } = get();
        const data = new FormData();
        data.append("memberId", formData.memberId);
        data.append("caption", formData.caption);
        data.append("imageFile", formData.imageFile);
        try {
            console.log(formData)
            console.log(data.imageFile)
            const response = await api.post("gallery/", data);
            set({ error: null });
            toast.success("sign up successful!");
            fetchGallery();
        } catch (err) {
            console.error("Error adding user: ", err);
            set({ error: err });
            toast.error("error uploading pictures");
        } finally {
            set({ uploading: false })
        }
    }
}));
