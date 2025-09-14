import React, { useEffect, useState } from 'react'
import { Plus, Calendar, Users, Edit, Trash2, ArrowLeftIcon, CalendarCheck } from 'lucide-react'
import { useEventStore } from '../../stores/useEventStore';
import { useNavigate, Link } from 'react-router-dom'

function AdminEvents() {
  const { events, getAttendance, fetchEvents, loading, deleteEvent} = useEventStore();
  const [eventToDelete, setEventToDelete] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchEvents();
    getAttendance();
  }, [])

  const getEventStatus = (e) => {
    const today = new Date().toISOString().slice(0, 10);
    const eventDay = new Date(e.start_datetime).toISOString().slice(0, 10);

    if (eventDay > today) {
      return { status: 'upcoming', badge: 'info' }
    } else if (eventDay !== today) {
      return { status: 'past', badge: 'warning' }
    } else if (eventDay === today) {
      return { status: 'ongoing', badge: 'primary' }
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Manage Events</h1>
            <p className="text-base-content/70">Create and manage chapter events</p>
          </div>
          <Link to='/admin/events/create'>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </button>
          </Link>
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
                      <th>attandance</th>
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
                        <td>{new Date(event.start_datetime).toDateString().slice(0, 10)}</td>
                        <td>{event.location || 'TBD'}</td>
                        <td>
                          <span className={`badge badge-${getEventStatus(event)?.badge || 'warning'}`}>
                            {getEventStatus(event)?.status || unknown}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <CalendarCheck className="w-4 h-4" />
                            {event.rsvp_count}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.attendee_count}
                          </div>
                        </td>
                        <td>{event.point_value} pts</td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { navigate(`/admin/events/edit/${event.event_id}`) }}
                              className="btn btn-ghost btn-sm">

                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="btn btn-ghost btn-sm text-error"
                              onClick={() => {
                                setEventToDelete(event);
                                document.getElementById("delete_event_modal").showModal()
                              }
                              }

                            >
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
      <dialog id="delete_event_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{eventToDelete?.title || "none"}</h3>
          <p className="py-4">Are you sure you want to delete this event?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  setEventToDelete(null)
                }}
              >Cancel</button>
            </form>
            <button
              className="btn btn-error"
              onClick={async () => {
                await deleteEvent(eventToDelete.event_id)
                document.getElementById("delete_modal").close()
                fetchEvents()
              }
              }

            >
              {loading?  
              <span className="loading loading-spinner loading-lg"></span>:
              <>
              <Trash2 className="w-4 h-4"/>
              Delete
              </>

            }
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AdminEvents
