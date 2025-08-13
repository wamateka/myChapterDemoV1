import React, { useEffect } from 'react'
import {Plus, Calendar, Users, Edit, Trash2}from 'lucide-react'
import { useEventStore } from '../../stores/useEventStore';

function AdminEvents() {
    const {events, getAttendance, getAttendanceByMemberId, fetchEvents} =  useEventStore();
    useEffect(()=>{
        fetchEvents();
        getAttendance();
    }, [])

    const getEventStatus = (e) => {
    const today = new Date().toISOString().slice(0, 10);
    const eventDay = new Date(e.start_datetime).toISOString().slice(0, 10);

    if (eventDay > today) {
      return {status: 'upcoming', badge: 'info'}
    } else if (eventDay !== today) {
      return {status: 'past', badge: 'warning'}
    } else if (eventDay === today){
      return {status: 'ongoing', badge: 'primary'}
    }
  }
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Manage Events</h1>
            <p className="text-base-content/70">Create and manage chapter events</p>
          </div>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </button>
        </div>

        {/* Events Table */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">All Events</h2>
            
            {events.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No events created</h3>
                <p className="text-base-content/70">Create your first event to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>RSVPs</th>
                      <th>Points</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.event_id}>
                        <td>
                          <div>
                            <div className="font-bold">{event.title}</div>
                            <div className="text-sm opacity-50">{event.description}</div>
                          </div>
                        </td>
                        <td>{new Date(event.start_datetime).toDateString().slice(0,10)}</td>
                        <td>{event.location || 'TBD'}</td>
                        <td>
                          <span className={`badge badge-${getEventStatus(event)?.badge|| 'warning'}`}>
                            {getEventStatus(event)?.status||unknown}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.rsvp_count || 0}
                          </div>
                        </td>
                        <td>{event.points_value} pts</td>
                        <td>
                          <div className="flex gap-2">
                            <button className="btn btn-ghost btn-sm">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="btn btn-ghost btn-sm text-error">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEvents
