import React, { useEffect } from 'react'
import { useDashBoard } from '../stores/useDashBoard'
import{Edit, Save,User,Phone,GraduationCap,Award,Calendar,Clock,MapPin} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
function DashBoardPage() {
  const {user, loadingUser} = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(user); 
  },[])
    // useEffect(()=>{
    //     getUser();
    // }, [getUser]);
    const recentActivity= []
    const recentRSVPs = [{ide: 1, title: 'ab', status: 'attended', event_date: new Date(2025, 5, 6), location: 'library' }, {ide: 2, title: 'cd', status: 'rsvp', event_date: new Date(2025, 7, 23), location: 'park' } ]
    const isEditing = false;
    const setIsEditing = () => {};

      if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }
    
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-base-content/70">Welcome back, {user?.first_name}!</p>
        </div>
        
      </div>
    </div>
  )
}

export default DashBoardPage
