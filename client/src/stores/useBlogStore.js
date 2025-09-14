import axios from "axios";
import { create } from "zustand";
import api from "../api.js";
import toast from "react-hot-toast";
export const useBlogStore = create((set, get) => ({
  blogs: [],
  loading: false,
  error: null,
  formData: {
    member_id: "",
    title: "",
    content: "",
    image_file: null,
  },
  setFormData: (formData) => set({ formData }),
  resetFormData: () =>set({
    formData: {
      author_member_id: "",
      title: "",
      content: "",
      image_file: null,
    },
  }),
  fetchBlogs: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/blogs");
      set({ blogs: response.data.data, error: null });
      console.log("fecthed blogs: ", response.data.data);
    } catch (err) {
      console.log("error fetching blog Data: ", err);
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },
  fetchBlog: async (id) => {
    set({ loading: true });
    const {setFormData, formData} = get();
    try{
      const response = await api.get(`/blogs/${id}`);
      setFormData(response.data.data);
    }catch(err){
      console.log("error fetching blog Data: ", err);
      set({ error: err });
    }finally{
      set({ loading: false });
    }
  },
  postBlog: async () => {
    set({ loading: true });
    const { formData } = get();
    var data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await api.post("/blogs", data);
      if (response.data.data){
        set({ error: null });
        toast.success("Blog created successfully!");
      }
        
      console.log("created blog: ", response.data.data);
    } catch (err) {
      toast.error("Error creating blog");
      console.log("error creating blog: ", err);
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },
  updateBlog: async (id) => {
    set({ loading: true });
    const {formData} = get();
    var data = new FormData();
    for (const key in formData){
      data.append(key, formData[key])
    }
    try{
      const response = await api.put(`/blogs/${id}`, data)
      if(response.data.data) toast.success("Updated Blog successfully");

    }catch(err){
      console.log("error updating blog: ", err)
      toast.error("error updating blog, try again");
    }finally{
      set({loading: false})
    }
  },
  deletePost: async (id) => {
    set({ loading: true });
    try {
      const response = await api.delete(`/blogs/${id}`);
      if (response.data.data){
        set({ error: null });
        toast.success("Blog deleted successfully!");
      }
    } catch (err) {
      toast.error("Error deleting blog");
      console.log("error deleting blog: ", err);
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  }
}));
