import React, { useEffect, useState } from 'react'
import { CalendarDays, MapPin, Users, Award, Clock, ArrowRight, HandCoins, Watch, CrossIcon, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRSVPStore } from '../stores/useRSVPStore';
function DisplayEventCard(props) {
  const {user} = useAuth();
  const { getEventRsvpStatus, loading_rsvp_status, setMemberRsvpStatus } = useRSVPStore();
  const [rsvp_status, set_rsvp_status] = useState();
  const [rsvp_count, set_rsvp_count] = useState();
  useEffect(()=>{
    const setRsvp = async () => {
      const s =  await getEventRsvpStatus(user.member_id, props.id)
      set_rsvp_status(s)
    };
    set_rsvp_count(props.rsvp_count);
    setRsvp();
  },[])
  async function handleRsvp(member_id, event_id, status){
    set_rsvp_status('')
    await setMemberRsvpStatus(member_id, event_id, status);
    const newStatus = await getEventRsvpStatus(member_id,event_id);
    if(status ==="attending"){
      set_rsvp_count(rsvp_count+1);
    }else{
      set_rsvp_count(rsvp_count-1);
    }
    set_rsvp_status(newStatus)

  }
  return (
    <div className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-all duration-300 
    rounded-2xl border border-base-200 
    overflow-hidden  hover:scale-[1.02] hover:border-primary "
    >
      {/* Event Image */}
      <figure className="relative">
        <img
          src={props.imgUrl}
          alt="event poster"
          className="w-full h-56 object-contain"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`badge badge-${props.status.badge} badge-lg shadow-md`}
          >
            {props.status.status}
          </span>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body px-6 py-5">
        {/* Event Title */}
        <h2 className="card-title text-xl font-bold leading-snug">
          {props.title}
        </h2>

        {/* Event Description */}
        <p className="text-sm text-gray-500 line-clamp-3">{props.description}</p>

        {/* Event Details */}
        <div className="space-y-3 mt-5">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{props.date}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-primary" />
            <span>
              {props.start_time} - {props.end_time}
            </span>
          </div>

          {/* Location */}
          {props.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{props.location}</span>
            </div>
          )}

          {/* Attendance */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-primary" />
            <span>
              {props.status.status === "past"
                ? `${props?.attendees} attended`
                : `${rsvp_count} coming`}
            </span>
          </div>

          {/* Points */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <HandCoins className="w-4 h-4 text-primary" />
            <span>Earn {props.points} points by attending</span>
          </div>

          {/* Spots */}
          {props.max_attendees && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-primary" />
              <span>
                {props.rsvp_count}/{props.max_attendees} spots filled
              </span>
            </div>
          )}
        </div>

        {/* RSVP Button */}
        {props.status.status !== "past" && (
          rsvp_status ?
            (
              <div className='card-actions justify-end mt-6'>
                <button className="btn btn-primary btn-sm px-4 gap-2 shadow-md hover:scale-105 transition" 
                disabled={rsvp_status == 'attending'}
                  onClick={async () => { await handleRsvp(user.member_id, props.id, 'attending') }}>
                  RSVP
                <ArrowRight className="w-4 h-4" />
                </button>
                {(rsvp_status == "attending") &&
                  (<button className="btn btn-warning btn-sm px-4 gap-2 shadow-md hover:scale-105 transition"
                    onClick={async () => { await handleRsvp(user.member_id, props.id, 'not attending') }}>
                    cancel
                  <X className="w-4 h-4"/>
                  </button>)}
              </div>
            ) :
            (
              <span className="loading loading-spinner loading-lg"></span>
            )
        )}
      </div>
    </div>
  )
}

export default DisplayEventCard

// {          <div className="card-actions justify-end mt-6">
//             <button className="btn btn-primary btn-sm px-4 gap-2 shadow-md hover:scale-105 transition">
//               RSVP
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div> }