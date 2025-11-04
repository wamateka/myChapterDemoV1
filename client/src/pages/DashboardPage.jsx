import React, { useEffect, useState } from 'react'
import { useUserStore } from '../stores/useUserStore'
import { Edit, Save, User, Phone, GraduationCap, Award, Calendar, MapPin, Ticket, Activity, Image, Clock, Star } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEventStore } from '../stores/useEventStore'
import { useRSVPStore } from '../stores/useRSVPStore'
// Reusable Stat Card
function StatCard({ label, value, icon, color }) {
  return (
    <div className="p-4 bg-base rounded-xl shadow flex items-center gap-3">
      <div className="p-2 bg-primary rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-lg font-bold ${color || ""}`}>{value}</p>
      </div>
    </div>
  );
}

// Reusable Card Wrapper
function Card({ title, children }) {
  return (
    <div className="p-5 bg-base-100 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

function DashBoardPage() {
  const { user, loadingUser } = useAuth();
  const { filter, filteredEvents, fetchEvents, setFilter, filterEvents } = useEventStore();
  const { stats, getStats } = useUserStore();
  const { getEventRsvpStatus, loading_rsvp_status, setMemberRsvpStatus } = useRSVPStore();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      await fetchEvents();
      await getStats(user.member_id);
      await setFilter('upcoming');
      await filterEvents();
    }
    loadData();

  }, [])
useEffect(() => {
  if (filteredEvents && filteredEvents.length > 0) {
    setEvents(filteredEvents.slice(0, 3));
  }
}, [filteredEvents]);

  // async function handleRsvp(member_id, event){
  //   event_status = await getEventRsvpStatus(member_id, event.event_id);
  //   event.status =  event_status;
  // }
  async function handleRsvp(member_id, event, status) {
    setEvents(prev =>
      prev.map(e =>
        e.event_id === event.event_id ? { ...e, status: '' } : e
      )
    );

    await setMemberRsvpStatus(member_id, event.event_id, status);
    const newStatus = await getEventRsvpStatus(member_id, event.event_id);

    // Update immutably
    setEvents(prev =>
      prev.map(e =>
        e.event_id === event.event_id ? { ...e, status: newStatus } : e
      )
    );
  }
  useEffect(() => {
    if (events?.length > 0) {
      setRsvpStatus(events);
    }

  }, [events])


  async function setRsvpStatus(events) {
    for (const e of events) {
      e.status = await getEventRsvpStatus(user.member_id, e.event_id);
    }
  }

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back, {user.first_name}!</h1>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Points" value={`${stats?.total_points} pts`} icon={<Star className="w-5 h-5" />} />
        <StatCard label="Events Attended" value={stats?.events_attended} icon={<Calendar className="w-5 h-5" />} />
        <StatCard
          label="Local Dues"
          value={user.local_dues ? "Paid" : "Unpaid"}
          color={user.local_dues ? "text-green-600" : "text-red-600"}
          icon={<Ticket className="w-5 h-5" />}
        />
        <StatCard
          label="National Dues"
          value={user.national_dues ? "Paid" : "Unpaid"}
          color={user.national_dues ? "text-green-600" : "text-red-600"}
          icon={<Ticket className="w-5 h-5" />}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <Card title="Upcoming Events">
            <ul className="space-y-4">
              {events?.map((event) => (
                <li
                  key={event.event_id}
                  className="flex items-center justify-between border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {new Date(event.start_datetime).toDateString()} • <Clock className="w-4 h-4" /> {event.time} • {event.location}
                    </p>
                  </div>
                  {!event.status ?
                    (<span className="loading loading-spinner loading-lg"></span>) :
                    (<div>
                      <button className="btn btn-primary btn-sm" disabled={event.status == 'attending'}
                        onClick={async () => { await handleRsvp(user.member_id, event, 'attending') }}>
                        RSVP
                      </button>
                      {(event.status == "attending") &&
                        (<button className="btn btn-warning btn-sm"
                          onClick={async () => { await handleRsvp(user.member_id, event, 'not attending') }}>
                          cancel
                        </button>)}
                    </div>
                    )
                  }
                  {/* <button className="btn btn-primary btn-sm" disabled>RSVP</button> */}
                </li>
              )
              )}
            </ul>
            <button className="btn btn-link mt-4">View All Events</button>
          </Card>

          {/* Announcements */}
          {/* <Card title="Announcements & Blog Highlights">
                  <ul className="list-disc pl-5 space-y-2">
                    {announcements.map((a) => (
                      <li key={a.id}>{a.title}</li>
                    ))}
                  </ul>
                  <button className="btn btn-link mt-4">Read More</button>
                </Card> */}
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Announcements */}
          {/* <Card title="Announcements & Blog Highlights">
                  <ul className="list-disc pl-5 space-y-2">
                    {announcements.map((a) => (
                      <li key={a.id}>{a.title}</li>
                    ))}
                  </ul>
                  <button className="btn btn-link mt-4">Read More</button>
                </Card> */}
          {/* Recent Activities */}

          {/* <Card title="Recent Activities">
                  <ul className="space-y-3">
                    {recentActivities.map((activity) => (
                      <li key={activity.id} className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        <span>{activity.text}</span>
                      </li>
                    ))}
                  </ul>
                </Card> */}

          {/* Committee Highlights */}
          {/* <Card title="Committee Highlights">
                  <p className="mb-3">Programs Committee meeting this Thursday</p>
                  <button className="btn btn-outline btn-sm">Join Technical Projects Committee</button>
                </Card> */}

          {/* Photo of the Week */}
          {/* <Card title="Photo of the Week">
                  <img
                    src="https://source.unsplash.com/random/400x300/?technology"
                    alt="Photo of the Week"
                    className="rounded-lg shadow-md cursor-pointer"
                  />
                </Card> */}
        </div>
      </div>
    </div>
  )
}

export default DashBoardPage
