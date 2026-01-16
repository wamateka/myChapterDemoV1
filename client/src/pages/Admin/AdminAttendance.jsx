import React, { useEffect, useState } from 'react'
import { useEventStore } from '../../stores/useEventStore'
import { useAttendanceStore } from '../../stores/useAttendanceStore';
import { Award, Users, CheckCircle, XCircle, Star, Activity, Plus, ArrowLeftIcon } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom';
import {useMemberStore} from '../../stores/useMemberStore';
import AddRecordModal from '../../components/AddRecordModal';
function AdminAttendance() {
  const { events, fetchEvents } = useEventStore();
  const {eventAttendance, fetchEventAttendance } = useAttendanceStore();
  const  {getMemberCount, memberCount} = useMemberStore()
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [records, setRecords] = useState();
  const navigate = useNavigate(null);
  useEffect(() => {
    getMemberCount();
    fetchEvents();
  }, [])

  useEffect(()=>{
    setRecords(eventAttendance);
  }, [eventAttendance]);

  async function handleEventSelect(event) {
    setSelectedEvent(event);
    const records = await fetchEventAttendance(event.event_id);
    setRecords(records);
    console.log("event attendance: ", records);
  }
  function setFilter(filter){
    if (filter === 'all'){
      setRecords(eventAttendance)
    }else if(filter == 'rsvpd'){
      setRecords(
        eventAttendance.filter((e) => e)
      )      
    }
  }


  return (
    <div className="min-h-screen bg-base-200 py-8">
      <button onClick={() => { navigate("/admin") }} className='btn btn-ghost mb-8'>
        <ArrowLeftIcon className='size-4 mr-2' />
        Back to admin page
      </button>
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
                      onClick={async () => await handleEventSelect(event)}
                      className={`w-full text-left p-3 rounded-lg border ${selectedEvent?.event_id === event.event_id
                        ? 'border-primary bg-primary/10'
                        : 'border-base-300 hover:border-primary/50'
                        }`}
                    >
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-sm text-base-content/70">
                        {new Date(event.start_datetime).toLocaleDateString().slice(0, 10)}
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
                    <button className="btn btn-primary mt-4" onClick={()=>{document.getElementById("add_record").showModal()}}>
                      <Plus className="w-4 h-4 mr-2" />
                      Record Attendance
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-row justify-between items-center">
                      {/* Stats section */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        <div className="stat bg-base-100 rounded-lg shadow p-3 flex items-center gap-3">
                          <Users className="w-6 h-6 text-info" />
                          <div>
                            <div className="text-xs text-base-content/70">RSVP</div>
                            <div className="text-lg font-bold">{selectedEvent.rsvp_count}</div>
                          </div>
                        </div>
                        <div className="stat bg-base-100 rounded-lg shadow p-3 flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-success" />
                          <div>
                            <div className="text-xs text-base-content/70">Attended</div>
                            <div className="text-lg font-bold">
                              {eventAttendance.filter((a) => a.status === 'present' ).length}
                            </div>
                          </div>
                        </div>
                        <div className="stat bg-base-100 rounded-lg shadow p-3 flex items-center gap-3">
                          <XCircle className="w-6 h-6 text-error" />
                          <div>
                            <div className="text-xs text-base-content/70">Missed</div>
                            <div className="text-lg font-bold">
                            {memberCount-selectedEvent.rsvp_count}
                            </div>
                          </div>
                        </div>
                        <div className="stat bg-base-100 rounded-lg shadow p-3 flex items-center gap-3">
                          <Star className="w-6 h-6 text-accent" />
                          <div>
                            <div className="text-xs text-base-content/70">Points</div>
                            <div className="text-lg font-bold">
                              {eventAttendance.reduce((sum, a) => sum + a.point_value, 0)}
                            </div>
                          </div>
                        </div>
                        <div className="stat bg-base-100 rounded-lg shadow p-3 flex items-center gap-3">
                          <Activity className="w-6 h-6 text-info" />
                          <div>
                            <div className="text-xs text-base-content/70">Commitment</div>
                            <div className="text-lg font-bold">
                              {selectedEvent.rsvp_count > 0
                                ? `${Math.round(
                                  (eventAttendance.filter((a) => a.status === "present").length /
                                    selectedEvent.rsvp_count) *
                                  100
                                )}%`
                                : "—"}
                            </div>
                          </div>
                        </div>
                        <div className="stat bg-base-100 rounded-lg shadow p-3 flex items-center gap-3">
                          <Users className="w-6 h-6 text-warning" />
                          <div>
                            <div className="text-xs text-base-content/70">Engagement</div>
                            <div className="text-lg font-bold">
                              {memberCount > 0
                                ? `${Math.round(
                                  (eventAttendance.filter((a) => a.status === "present").length /
                                    memberCount) *
                                  100
                                )}%`
                                : "—"}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setFilter("all")} className="btn btn-xs btn-outline">
                        All
                      </button>
                      <button onClick={() => setFilter("attended")} className="btn btn-xs btn-outline">
                        Attended
                      </button>
                      <button onClick={() => setFilter("rsvp")} className="btn btn-xs btn-outline">
                        RSVP'd
                      </button>
                      <button onClick={() => setFilter("missed")} className="btn btn-xs btn-outline">
                        Missed
                      </button>
                      <button onClick={() => setFilter("noRsvp")} className="btn btn-xs btn-outline">
                        No RSVP
                      </button>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={()=>{document.getElementById("add_record").showModal()} }>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Record
                    </button>
                  </div>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        <thead>
                          <tr>
                            <th>Member</th>
                            <th>Attended</th>
                            <th>Points</th>
                            <th>check_in</th>
                            <th>Actions</th>                            
                          </tr>
                        </thead>
                        <tbody>
                          {records?.map((record, index) => (
                            <tr key={record.attendance_id}>
                              <td>
                                <div className="font-semibold">
                                 {index +1 }. {record.first_name} {record.last_name}
                                </div>
                              </td>
                              <td>
                                {record.status === 'present' ? (
                                  <CheckCircle className="w-5 h-5 text-success" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-error" />
                                )}
                              </td>
                              <td>{record.point_value} pts</td>
                              <td>{new Date(record.checked_in_at).toLocaleTimeString() || 'none'}</td>
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
      <AddRecordModal event_id= {selectedEvent?.event_id}/>
    </div>
  )
}

export default AdminAttendance


