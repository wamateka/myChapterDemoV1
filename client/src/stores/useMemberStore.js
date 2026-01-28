import { create } from "zustand";
import api from "../api";
import toast from "react-hot-toast";

export const useMemberStore = create((set, get) => ({
    loading: false,
    membersList: [],
    memberCount: 0,
    selectedMember: null,
    filters: {
        search: "",
        status: "all", // all, active, inactive, alumni
        role: "all", // all, member, officer, admin
        dues: "all", // all, paid, unpaid
    },
    page: 1,
    pageSize: 10,

    // Getters
    getMemberList: async () => {
        set({ loading: true });
        try {
            const res = await api.get("/members");
            set({ membersList: res.data.data || [] });
        } catch (err) {
            console.log(err);
            toast.error("Failed to load members");
        } finally {
            set({ loading: false });
        }
    },

    getMemberCount: async () => {
        try {
            const res = await api.get("/members/count");
            set({ memberCount: res.data.data.count || 0 });
        } catch (err) {
            console.log(err);
        }
    },

    getMemberById: async (id) => {
        set({ loading: true });
        try {
            const res = await api.get(`/members/${id}`);
            set({ selectedMember: res.data.data });
            return res.data.data;
        } catch (err) {
            console.log(err);
            toast.error("Failed to load member details");
        } finally {
            set({ loading: false });
        }
    },

    // Mutations
    createMember: async (memberData) => {
        set({ loading: true });
        try {
            const res = await api.post("/members", memberData);
            toast.success("Member added successfully");
            get().getMemberList();
            return res.data.data;
        } catch (err) {
            console.log(err);
            if (err.response?.status === 409) {
                toast.error("Email already exists");
            } else {
                toast.error("Failed to create member");
            }
        } finally {
            set({ loading: false });
        }
    },

    updateMember: async (id, memberData) => {
        set({ loading: true });
        try {
            const res = await api.put(`/members/${id}`, memberData);
            toast.success("Member updated successfully");
            get().getMemberList();
            if (get().selectedMember?.member_id === id) {
                set({ selectedMember: res.data.data });
            }
            return res.data.data;
        } catch (err) {
            console.log(err);
            toast.error("Failed to update member");
        } finally {
            set({ loading: false });
        }
    },

    deactivateMember: async (id) => {
        set({ loading: true });
        try {
            await api.patch(`/members/${id}/deactivate`);
            toast.success("Member deactivated");
            get().getMemberList();
        } catch (err) {
            console.log(err);
            toast.error("Failed to deactivate member");
        } finally {
            set({ loading: false });
        }
    },

    deleteMember: async (id) => {
        set({ loading: true });
        try {
            await api.delete(`/members/${id}`);
            toast.success("Member deleted");
            get().getMemberList();
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete member");
        } finally {
            set({ loading: false });
        }
    },

    bulkUpdateMembers: async (memberIds, updates) => {
        set({ loading: true });
        try {
            await api.patch("/members/bulk", { ids: memberIds, updates });
            toast.success("Members updated successfully");
            get().getMemberList();
        } catch (err) {
            console.log(err);
            toast.error("Failed to update members");
        } finally {
            set({ loading: false });
        }
    },

    // Filter & pagination
    setFilters: (filters) => set({ filters }),
    setPage: (page) => set({ page }),
    setSearch: (search) => set(state => ({ filters: { ...state.filters, search } })),
    setStatusFilter: (status) =>
        set(state => ({ filters: { ...state.filters, status } })),
    setRoleFilter: (role) =>
        set(state => ({ filters: { ...state.filters, role } })),
    setDuesFilter: (dues) =>
        set(state => ({ filters: { ...state.filters, dues } })),
}))