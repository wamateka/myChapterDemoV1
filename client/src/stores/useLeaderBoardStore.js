import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../api';
import Leaderboard from '../pages/LeaderBoardPage';
export const useLeaderBoardStore = create((set,get) => ({
    loading: false,
    Leaderboard: [],

    fetchLeaderboard: async()=>{
        set({loading: true})
        const {Leaderboard} = get()
        try{
            const response = await api.get(`/members/leaderboard/leaderboard`);
            set({Leaderboard: response.data.data})
            console.log('fetched leaderboard: ', Leaderboard);
        }catch (err){
            console.log(`error fetching leaderboard: `, err)
        }finally{
            set({loading: false})
        }
    }
}))