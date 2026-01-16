import axios from "axios";
import { create } from "zustand";
import api from "../api.js";
import toast from "react-hot-toast";
import e from "cors";
export const useAttendanceStore = create((set, get) => ({
  loading: false,
  checkinCredentials: {
    member_id: "",
    event_id: "",
    checkin_code: "",
  },
  selectedMembers: [],
  attendances: [],
  eventAttendance: [],
  memberAttendance: [],
  error: null,
  setSelectedMembers: (selectedMembers) =>
    set({ selectedMembers: selectedMembers }),
  fetchAttendances: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/attendances");
      set({ attendances: response.data.data, error: null });
    } catch (err) {
      console.log("error fetching attendances: ", err);
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },

  fetchEventAttendance: async (id) => {
    set({ loading: true });
    try {
      const response = await api.get(`/attendances/event/${id}`);
      set({ eventAttendance: response.data.data, error: null });
      console.log("fetched event attendance records: ", response.data.data);
      return response.data.data
    } catch (err) {
      console.log("error fetching attendancs: ", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchMemberAttendance: async (id) => {
    set({ loading: true });
    try {
      const response = await api.get(`/attendances/member/${id}`);
      set({ memberAttendance: response.data.data, error: null });
      console.log("fetched member attendance records: ", response.data.data);
    } catch (err) {
      console.log("error fetching attendancs: ", err);
    } finally {
      set({ loading: false });
    }
  },

  addAttendanceRecord: async (member_id, event_id) => {
    set({ loading: true });
    try {
      const response = await api.post(`/attendances/member`, {
        member_id,
        event_id,
      });
      toast.success("1 member checked in successfully");
    } catch (err) {
      if (err.status === 409) {
        toast.error("attendance record already exists for one member");
      } else if (err.status === 400) {
        toast.error("error adding attendance record, for one member");
      }
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },

  checkinMember: async (checkinCode, member_id, event_id) => {
    set({ loading: true });
    try {
      const res = await api.post(`attendances/checkin/${checkinCode}`, {
        member_id,
        event_id,
      });
      return "success";
    } catch (err) {
      if (err.status === 409) {
        console.log("error checking user", err);
        return "already_checked_in";
      } else if (err.status === 400) {
        console.log("error checking user", err);
        return "invalid_code";
      } else {
        console.log("error checking user", err);
        return "error";
      }
    } finally {
      set({ loading: false });
    }
  },
}));
