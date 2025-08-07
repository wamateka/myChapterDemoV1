import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
const BASE_URL = 'http://localhost:3000/api/events';
export const useEventStore = create((set,get) => ({
    filter: 'all',
    filterdEvents: [],
    events: [],
    loading: false,
    error: null,
    setFilter: (filter) => set({filter}),
    fetchEvents: async () => {
        set({laodung: true, error: null});
        try{
            const response = await axios.get(BASE_URL);
            set({events: response.data.data, error: null, filteredEvents: response.data.data})
            console.log("Events fetched:", response.data.data);
        }catch(err){
            console.log("error fetching events:", err);
            set({error: err});
        }finally {
            set({loading: false});
        }
    },
    filterEvents: () => {
        set({loading: true})
        const {filter,events} = get();
        if(filter === 'all'){
            set({filteredEvents: events});
            set({loading:false});
        }else if(filter === 'upcoming'){
            const upcomingEvents = events.filter(e => new Date(e.start_datetime)> new Date());
            set({filteredEvents: upcomingEvents});
            set({loading:false});
        }else if(filter === 'ongoing'){
            const ongoingEvents = events.filter(e => new Date(e.start_datetime).toISOString().slice(0,10) === new Date().toISOString().slice(0,10))
            set({filteredEvents: ongoingEvents});
            set({loading:false});
        }else if(filter === 'past'){
            const pastEvents = events.filter(e => new Date(e.start_datetime)< new Date() && !(new Date(e.start_datetime).toISOString().slice(0,10) === new Date().toISOString().slice(0,10)));
            set({filteredEvents: pastEvents});
            set({loading:false});
        }
        console.log(`filtered events${get().filteredEvents.length}:`, get().filteredEvents);
    }
}))
