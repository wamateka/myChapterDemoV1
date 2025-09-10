import React from 'react'
import { CalendarDays, MapPin, Users, Award, Clock, ArrowRight, HandCoins, Watch } from 'lucide-react';
function DisplayEventCard(props) {
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
                : `${props.rsvp_count} coming`}
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
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary btn-sm px-4 gap-2 shadow-md hover:scale-105 transition">
              RSVP
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayEventCard
