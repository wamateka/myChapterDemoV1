import React from 'react'
import {CalendarDays , MapPin, Users, Award, Clock, ArrowRight, HandCoins, Watch} from 'lucide-react';
function DisplayEventCard(props) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src= {props.imgUrl}
                    alt= 'event poster'
                    />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {props.title}
                    <div className={`badge badge-${props.status.badge} badge-outline`}>{props.status.status}</div>
                </h2>
                <p>{props.description}</p>
                <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="w-4 h-4 text-primary" />
                      <span>
                        {props.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{props.start_time} - {props.end_time}</span>
                    </div>
                    
                    {props.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{props.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{props.status.status === 'past'? `${props?.attendance?.length} attended!`: `${props.rsvp_count} Are coming !`}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <HandCoins className="w-4 h-4 text-primary" />
                      <span>earn {props.points} points by attending</span>
                    </div>                    
                    {props.max_attendees && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>
                          {props.rsvp_count}/{props.resvp_count} spots filled
                        </span>
                      </div>
                    )}
                  </div>
                  {props.status.status !== 'past' && <div className="card-actions justify-end mt-4">
                    <button 
                      className="btn btn-primary btn-sm"
                    >
                      RSVP
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>}
            </div>
        </div>
    )
}

export default DisplayEventCard
