// Dashboard.jsx
import React from "react";
import { Calendar, Bell, Award, Image, Clock, MapPin } from "lucide-react";

const Dashboard = () => {
  // Random placeholder data
  const userName = "Barry";
  const points = 1250;
  const eventsAttended = 8;
  const upcomingEvents = [
    "Tech Talk: AI in Industry",
    "Networking Mixer",
    "Community Service Day",
    "Workshop: Resume Building",
    "Chapter Meeting"
  ];
  const recentRSVPs = [
    { id: 1, title: "Tech Talk: AI in Industry", event_date: "2025-08-14", location: "Room 101", status: "attended" },
    { id: 2, title: "Networking Mixer", event_date: "2025-08-16", location: "Hall A", status: "rsvp" },
  ];
  const announcements = [
    "NSBE Chapter meeting this Friday at 5PM.",
    "Submit your points for last month's events.",
    "New blog post: Volunteering Highlights."
  ];
  const galleryPhotos = [
    "https://picsum.photos/200/200?random=1",
    "https://picsum.photos/200/200?random=2",
    "https://picsum.photos/200/200?random=3",
    "https://picsum.photos/200/200?random=4"
  ];

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-base-content/70">Welcome back, {userName}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat bg-base-100 rounded-lg shadow p-4 text-center">
            <div className="stat-figure text-primary">
              <Award className="w-8 h-8 mx-auto" />
            </div>
            <div className="stat-title">Total Points</div>
            <div className="stat-value text-primary">{points}</div>
            <div className="stat-desc">Earned from events</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow p-4 text-center">
            <div className="stat-figure text-secondary">
              <Calendar className="w-8 h-8 mx-auto" />
            </div>
            <div className="stat-title">Events Attended</div>
            <div className="stat-value text-secondary">{eventsAttended}</div>
            <div className="stat-desc">This semester</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow p-4 text-center">
            <div className="stat-figure text-accent">
              <Bell className="w-8 h-8 mx-auto" />
            </div>
            <div className="stat-title">Announcements</div>
            <div className="stat-value text-accent">{announcements.length}</div>
            <div className="stat-desc">Unread</div>
          </div>
        </div>

        {/* Announcements */}
        <div className="card bg-base-100 shadow rounded-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2"><Bell className="w-5 h-5" /> Announcements</h2>
            <ul className="list-disc pl-5 space-y-2">
              {announcements.map((item, i) => (
                <li key={i} className="text-base-content/80">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card bg-base-100 shadow rounded-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2"><Calendar className="w-5 h-5" /> Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {upcomingEvents.slice(0, 5).map((event, i) => (
                <div key={i} className="bg-base-200 p-4 rounded-lg shadow">
                  <h3 className="font-semibold">{event}</h3>
                  <p className="text-sm text-base-content/70">Aug {14 + i}, 2025</p>
                  <button className="mt-2 btn btn-primary btn-sm">RSVP</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RSVP Events */}
        <div className="card bg-base-100 shadow rounded-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2"><Clock className="w-5 h-5" /> Your RSVP Events</h2>
            {recentRSVPs.length === 0 ? (
              <p className="text-base-content/70">No upcoming RSVPs</p>
            ) : (
              <div className="space-y-3 mt-4">
                {recentRSVPs.map((rsvp) => (
                  <div key={rsvp.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{rsvp.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-base-content/70">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(rsvp.event_date).toLocaleDateString()}
                        </span>
                        {rsvp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {rsvp.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`badge ${
                      rsvp.status === 'attended' ? 'badge-success' :
                      rsvp.status === 'rsvp' ? 'badge-primary' :
                      'badge-neutral'
                    }`}>
                      {rsvp.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Gallery Highlights */}
        <div className="card bg-base-100 shadow rounded-lg">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2"><Image className="w-5 h-5" /> Gallery Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {galleryPhotos.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Gallery ${i}`}
                  className="rounded-lg cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
