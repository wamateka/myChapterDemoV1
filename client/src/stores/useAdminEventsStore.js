import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../api';
export const useAdminEventStore = create((set, get) => ({
    filter: 'all',
    filterdEvents: [],
    events: [],
    loading: false,
    attendances: [],
    error: null,
    setFilter: (filter) => set({ filter }),
    fetchEvents: async () => {
        set({ laodung: true, error: null });
        try {
            const response = await api.get(`/events`);
            set({ events: response.data.data, error: null, filteredEvents: response.data.data });
            console.log('fecthed events: ', response.data.data)
        } catch (err) {
            console.log("error fetching events:", err);
            set({ error: err });
        } finally {
            set({ loading: false });
        }
    },
    filterEvents: () => {
        set({ loading: true })
        const { filter, events } = get();
        if (filter === 'all') {
            set({ filteredEvents: events });
            set({ loading: false });
        } else if (filter === 'upcoming') {
            const upcomingEvents = events.filter(e => new Date(e.start_datetime) > new Date());
            set({ filteredEvents: upcomingEvents });
            set({ loading: false });
        } else if (filter === 'ongoing') {
            const ongoingEvents = events.filter(e => new Date(e.start_datetime).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10))
            set({ filteredEvents: ongoingEvents });
            set({ loading: false });
        } else if (filter === 'past') {
            const pastEvents = events.filter(e => new Date(e.start_datetime) < new Date() && !(new Date(e.start_datetime).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)));
            set({ filteredEvents: pastEvents });
            set({ loading: false });
        }
    },
    getAttendance: async () => {
        set({ loading: true })
        try {
            const results = await api.get('/attendances');
            console.log(results.data.data)

        } catch (err) {
            console.log("error getting attendances: ", err);
            set({})

        } finally {
            set({loading: false})
        }
    },
    getAttendanceByMemberId: async(id)=>{
        set({ loading: true })
        try{
            const response = await addPoints.get(`attendances/member/${id}`)
            set({ attendances: response.data.data, error: null});
        }catch(err){
            console.log('error get an attendance: ', err)
        }finally{
            set({loading: false})
        }
    }
}))
