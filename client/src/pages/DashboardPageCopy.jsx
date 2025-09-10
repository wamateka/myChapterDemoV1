import React from "react";
import { Calendar, Ticket, User, Activity, Image, Clock } from "lucide-react";

// Temporary mock until real auth is connected
const useAuthMock = () => ({
  user: {
    name: "Barry",
    avatar: "https://i.pravatar.cc/150?img=3",
    points: 120,
    eventsAttended: 8,
    localDuesPaid: true,
    nationalDuesPaid: false,
  },
});

export default function Dashboard() {
  const { user } = useAuthMock();

  const upcomingEvents = [
    { id: 1, title: "General Body Meeting", date: "Aug 28", time: "6:00 PM", location: "Room 201" },
    { id: 2, title: "Tech Workshop", date: "Sep 2", time: "3:00 PM", location: "Innovation Lab" },
    { id: 3, title: "Community Outreach", date: "Sep 7", time: "10:00 AM", location: "Main Quad" },
  ];

  const recentActivities = [
    { id: 1, type: "Blog", text: "New Blog Post: How to Ace Your Interviews" },
    { id: 2, type: "Gallery", text: "Photo added to Gallery: Summer BBQ" },
    { id: 3, type: "Event", text: "New Event Posted: Hackathon 2025" },
  ];

  const announcements = [
    { id: 1, title: "NSBE Nationals Registration Now Open!" },
    { id: 2, title: "Meet the New E-board" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Points" value={`${user.points} pts`} icon={<User className="w-5 h-5" />} />
        <StatCard label="Events Attended" value={user.eventsAttended} icon={<Calendar className="w-5 h-5" />} />
        <StatCard
          label="Local Dues"
          value={user.localDuesPaid ? "Paid" : "Unpaid"}
          color={user.localDuesPaid ? "text-green-600" : "text-red-600"}
          icon={<Ticket className="w-5 h-5" />}
        />
        <StatCard
          label="National Dues"
          value={user.nationalDuesPaid ? "Paid" : "Unpaid"}
          color={user.nationalDuesPaid ? "text-green-600" : "text-red-600"}
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
              {upcomingEvents.map((event) => (
                <li
                  key={event.id}
                  className="flex items-center justify-between border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {event.date} • <Clock className="w-4 h-4" /> {event.time} • {event.location}
                    </p>
                  </div>
                  <button className="btn btn-primary btn-sm" disabled>RSVP</button>
                </li>
              ))}
            </ul>
            <button className="btn btn-link mt-4">View All Events</button>
          </Card>

          {/* Announcements */}
          <Card title="Announcements & Blog Highlights">
            <ul className="list-disc pl-5 space-y-2">
              {announcements.map((a) => (
                <li key={a.id}>{a.title}</li>
              ))}
            </ul>
            <button className="btn btn-link mt-4">Read More</button>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <Card title="Recent Activities">
            <ul className="space-y-3">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>{activity.text}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Committee Highlights */}
          <Card title="Committee Highlights">
            <p className="mb-3">Programs Committee meeting this Thursday</p>
            <button className="btn btn-outline btn-sm">Join Technical Projects Committee</button>
          </Card>

          {/* Photo of the Week */}
          <Card title="Photo of the Week">
            <img
              src="https://source.unsplash.com/random/400x300/?technology"
              alt="Photo of the Week"
              className="rounded-lg shadow-md cursor-pointer"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

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
