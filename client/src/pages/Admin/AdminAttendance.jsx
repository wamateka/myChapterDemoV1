import React, { useEffect, useState } from 'react'
import { useEventStore } from '../../stores/useEventStore'
import { useAttendanceStore } from '../../stores/useAttendanceStore';
import { Award, Users, CheckCircle, XCircle, Plus } from 'lucide-react'
function AdminAttendance() {
    const {events,fetchEvents} = useEventStore();
    const {fetchAttendances, attendances, loading,  memberAttendance,eventAttendance, fetchEventAttendance}  = useAttendanceStore();
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(()=>{
        fetchEvents();
        fetchAttendances();
    },[])
    function handleEventSelect(event){
        setSelectedEvent(event);
        fetchEventAttendance(event.event_id);
    }

    
  return (
        <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Attendance Management</h1>
          <p className="text-base-content/70">Track event attendance and award points</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Selection */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Select Event</h2>
                <div className="space-y-2">
                  {events.map((event) => (
                    <button
                      key={event.event_id}
                      onClick={() => handleEventSelect(event)}
                      className={`w-full text-left p-3 rounded-lg border ${
                        selectedEvent?.event_id === event.event_id
                          ? 'border-primary bg-primary/10'
                          : 'border-base-300 hover:border-primary/50'
                      }`}
                    >
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-sm text-base-content/70">
                        {new Date(event.event_date).toLocaleDateString().slice(0,10)}
                      </div>
                      <div className="text-xs text-base-content/50">
                        {event.location || 'Location TBD'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Records */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  Attendance Records
                  {selectedEvent && (
                    <span className="text-sm font-normal text-base-content/70">
                      - {selectedEvent.title}
                    </span>
                  )}
                </h2>

                {!selectedEvent ? (
                  <div className="text-center py-8">
                    <Award className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select an Event</h3>
                    <p className="text-base-content/70">
                      Choose an event from the list to view and manage attendance
                    </p>
                  </div>
                ) : eventAttendance?.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No attendance records</h3>
                    <p className="text-base-content/70">
                      No attendance has been recorded for this event yet
                    </p>
                    <button className="btn btn-primary mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Record Attendance
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="stats stats-horizontal shadow">
                        <div className="stat">
                          <div className="stat-title">Total</div>
                          <div className="stat-value">{eventAttendance.length}</div>
                        </div>
                        <div className="stat">
                          <div className="stat-title">Attended</div>
                          <div className="stat-value text-success">
                            {eventAttendance.filter(a => a.status === 'present').length}
                          </div>
                        </div>
                        <div className="stat">
                          <div className="stat-title">Points Awarded</div>
                          <div className="stat-value text-primary">
                            {eventAttendance.reduce((sum, a) => sum + a.points_value, 0)|| 0}
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Record
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        <thead>
                          <tr>
                            <th>Member</th>
                            <th>Email</th>
                            <th>Attended</th>
                            <th>Points</th>
                            <th>Notes</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventAttendance.map((record) => (
                            <tr key={record.event_id}>
                              <td>
                                <div className="font-semibold">
                                  {record.first_name} {record.last_name}
                                </div>
                              </td>
                              <td>{record.email}</td>
                              <td>
                                {record.attended ? (
                                  <CheckCircle className="w-5 h-5 text-success" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-error" />
                                )}
                              </td>
                              <td>{record.points_earned} pts</td>
                              <td>
                                <span className="text-sm text-base-content/70">
                                  {record.notes || '-'}
                                </span>
                              </td>
                              <td>
                                <div className="flex gap-2">
                                  <button className="btn btn-ghost btn-sm">
                                    Edit
                                  </button>
                                  <button className="btn btn-ghost btn-sm text-error">
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAttendance
