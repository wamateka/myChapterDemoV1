// Dashboard.jsx
// import React from "react";
// import { Calendar, Bell, Award, Image, Clock, MapPin } from "lucide-react";

// const Dashboard = () => {
//   // Random placeholder data
//   const userName = "Barry";
//   const points = 1250;
//   const eventsAttended = 8;
//   const upcomingEvents = [
//     "Tech Talk: AI in Industry",
//     "Networking Mixer",
//     "Community Service Day",
//     "Workshop: Resume Building",
//     "Chapter Meeting"
//   ];
//   const recentRSVPs = [
//     { id: 1, title: "Tech Talk: AI in Industry", event_date: "2025-08-14", location: "Room 101", status: "attended" },
//     { id: 2, title: "Networking Mixer", event_date: "2025-08-16", location: "Hall A", status: "rsvp" },
//   ];
//   const announcements = [
//     "NSBE Chapter meeting this Friday at 5PM.",
//     "Submit your points for last month's events.",
//     "New blog post: Volunteering Highlights."
//   ];
//   const galleryPhotos = [
//     "https://picsum.photos/200/200?random=1",
//     "https://picsum.photos/200/200?random=2",
//     "https://picsum.photos/200/200?random=3",
//     "https://picsum.photos/200/200?random=4"
//   ];

//   return (
//     <div className="min-h-screen bg-base-200 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
//           <p className="text-base-content/70">Welcome back, {userName}!</p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="stat bg-base-100 rounded-lg shadow p-4 text-center">
//             <div className="stat-figure text-primary">
//               <Award className="w-8 h-8 mx-auto" />
//             </div>
//             <div className="stat-title">Total Points</div>
//             <div className="stat-value text-primary">{points}</div>
//             <div className="stat-desc">Earned from events</div>
//           </div>

//           <div className="stat bg-base-100 rounded-lg shadow p-4 text-center">
//             <div className="stat-figure text-secondary">
//               <Calendar className="w-8 h-8 mx-auto" />
//             </div>
//             <div className="stat-title">Events Attended</div>
//             <div className="stat-value text-secondary">{eventsAttended}</div>
//             <div className="stat-desc">This semester</div>
//           </div>

//           <div className="stat bg-base-100 rounded-lg shadow p-4 text-center">
//             <div className="stat-figure text-accent">
//               <Bell className="w-8 h-8 mx-auto" />
//             </div>
//             <div className="stat-title">Announcements</div>
//             <div className="stat-value text-accent">{announcements.length}</div>
//             <div className="stat-desc">Unread</div>
//           </div>
//         </div>

//         {/* Announcements */}
//         <div className="card bg-base-100 shadow rounded-lg">
//           <div className="card-body">
//             <h2 className="card-title flex items-center gap-2"><Bell className="w-5 h-5" /> Announcements</h2>
//             <ul className="list-disc pl-5 space-y-2">
//               {announcements.map((item, i) => (
//                 <li key={i} className="text-base-content/80">{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Upcoming Events */}
//         <div className="card bg-base-100 shadow rounded-lg">
//           <div className="card-body">
//             <h2 className="card-title flex items-center gap-2"><Calendar className="w-5 h-5" /> Upcoming Events</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//               {upcomingEvents.slice(0, 5).map((event, i) => (
//                 <div key={i} className="bg-base-200 p-4 rounded-lg shadow">
//                   <h3 className="font-semibold">{event}</h3>
//                   <p className="text-sm text-base-content/70">Aug {14 + i}, 2025</p>
//                   <button className="mt-2 btn btn-primary btn-sm">RSVP</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RSVP Events */}
//         <div className="card bg-base-100 shadow rounded-lg">
//           <div className="card-body">
//             <h2 className="card-title flex items-center gap-2"><Clock className="w-5 h-5" /> Your RSVP Events</h2>
//             {recentRSVPs.length === 0 ? (
//               <p className="text-base-content/70">No upcoming RSVPs</p>
//             ) : (
//               <div className="space-y-3 mt-4">
//                 {recentRSVPs.map((rsvp) => (
//                   <div key={rsvp.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
//                     <div>
//                       <h3 className="font-semibold">{rsvp.title}</h3>
//                       <div className="flex items-center gap-4 text-sm text-base-content/70">
//                         <span className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           {new Date(rsvp.event_date).toLocaleDateString()}
//                         </span>
//                         {rsvp.location && (
//                           <span className="flex items-center gap-1">
//                             <MapPin className="w-4 h-4" />
//                             {rsvp.location}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <span className={`badge ${
//                       rsvp.status === 'attended' ? 'badge-success' :
//                       rsvp.status === 'rsvp' ? 'badge-primary' :
//                       'badge-neutral'
//                     }`}>
//                       {rsvp.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Gallery Highlights */}
//         <div className="card bg-base-100 shadow rounded-lg">
//           <div className="card-body">
//             <h2 className="card-title flex items-center gap-2"><Image className="w-5 h-5" /> Gallery Highlights</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//               {galleryPhotos.map((url, i) => (
//                 <img
//                   key={i}
//                   src={url}
//                   alt={`Gallery ${i}`}
//                   className="rounded-lg cursor-pointer hover:opacity-80"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect } from "react";
// NOTE: The original import below failed because the file could not be found.
// When your AuthContext is ready, replace the mock hook with the real one and
// uncomment the import below, then remove the mock implementation.
// import { useAuth } from "../context/AuthContext";

import {
  User,
  Calendar,
  Award,
  MapPin,
  Clock,
  Image,
  FileText,
} from "lucide-react";

/***********************
 * AUTH HOOK — DEV MOCK *
 ***********************
 * This fallback makes the page runnable even if ../context/AuthContext
 * doesn't exist yet. Swap it with your real `useAuth` once available.
 */
function useAuthMock() {
  return {
    user: {
      first_name: "Barry",
      last_name: "Allen",
      email: "barry@example.com",
      points: 120,
      local_dues_paid: true,
      national_dues_paid: false,
      created_at: "2025-08-01T00:00:00Z",
    },
    loadingUser: false,
  };
}
const useAuth = useAuthMock; // <-- Replace with real `useAuth` import when ready

function DashBoardPageCopy() {
  const { user, loadingUser } = useAuth();

  // Placeholder data (wireframe-aligned)
  const upcomingEvents = [
    { id: 1, title: "General Body Meeting", date: new Date(2025, 7, 28), location: "Student Center" },
    { id: 2, title: "Career Fair", date: new Date(2025, 8, 5), location: "Main Hall" },
    { id: 3, title: "Volunteer Day", date: new Date(2025, 8, 15), location: "City Park" },
  ];

  const announcements = [
    { id: 1, title: "NSBE Nationals Registration Now Open!" },
    { id: 2, title: "Meet the New E-board" },
  ];

  const recentActivities = [
    { id: 1, type: "blog", message: "New blog post: Internship Tips" },
    { id: 2, type: "gallery", message: "5 new gallery photos uploaded" },
    { id: 3, type: "event", message: "Career Fair posted" },
  ];

  /*******************
   * SMOKE TEST CASES *
   *******************
   * These run once in dev to validate basic assumptions. They won't break the UI
   * but will log clear errors in the console if something is off.
   */
  useEffect(() => {
    // Test 1: Upcoming events
    console.assert(
      Array.isArray(upcomingEvents) && upcomingEvents.length === 3,
      "[TEST] Expected exactly 3 upcoming events"
    );
    console.assert(
      upcomingEvents.every((e) => e && e.id && e.title && e.date instanceof Date),
      "[TEST] Each event should have id, title, and a valid Date"
    );

    // Test 2: Announcements present
    console.assert(
      Array.isArray(announcements) && announcements.length >= 2,
      "[TEST] Expected at least 2 announcements"
    );

    // Test 3: Recent activities types
    const validTypes = new Set(["blog", "gallery", "event"]);
    console.assert(
      recentActivities.every((a) => validTypes.has(a.type)),
      "[TEST] Recent activities must have type: blog | gallery | event"
    );

    // Test 4: User shape
    console.assert(
      user && typeof user.first_name === "string",
      "[TEST] User should have a first_name string"
    );
  }, []);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Welcome back, {user?.first_name}!</h1>
            <p className="text-base-content/70">Here’s what’s happening with NSBE.</p>
          </div>
          <div className="avatar cursor-pointer" onClick={() => console.log("Go to profile")}> 
            <div className="w-12 rounded-full">
              <img src="https://i.pravatar.cc/150" alt="profile" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="stat bg-base-100 rounded-lg shadow">
                <div className="stat-figure text-primary"><Award className="w-8 h-8" /></div>
                <div className="stat-title">Points</div>
                <div className="stat-value text-primary">{user?.points ?? 0}</div>
                <div className="stat-desc">Earned from events</div>
              </div>
              <div className="stat bg-base-100 rounded-lg shadow">
                <div className="stat-figure text-secondary"><User className="w-8 h-8" /></div>
                <div className="stat-title">Local Dues</div>
                <div className={`stat-value ${user?.local_dues_paid ? "text-success" : "text-warning"}`}>
                  {user?.local_dues_paid ? "Paid" : "Unpaid"}
                </div>
                <div className="stat-desc">This chapter</div>
              </div>
              <div className="stat bg-base-100 rounded-lg shadow">
                <div className="stat-figure text-accent"><User className="w-8 h-8" /></div>
                <div className="stat-title">National Dues</div>
                <div className={`stat-value ${user?.national_dues_paid ? "text-success" : "text-warning"}`}>
                  {user?.national_dues_paid ? "Paid" : "Unpaid"}
                </div>
                <div className="stat-desc">NSBE Nationals</div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-base-content/70">
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{event.date.toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.location}</span>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm">RSVP</button>
                    </div>
                  ))}
                </div>
                <button className="btn btn-link mt-3">View All Events</button>
              </div>
            </div>

            {/* Announcements */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Announcements & Blog Highlights</h2>
                <ul className="list-disc ml-6 space-y-2">
                  {announcements.map(a => (
                    <li key={a.id} className="text-base-content/80">{a.title}</li>
                  ))}
                </ul>
                <button className="btn btn-secondary btn-sm mt-3">Read More</button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Recent Activities</h2>
                <ul className="space-y-3">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="flex items-center gap-3">
                      {activity.type === "blog" && <FileText className="w-5 h-5 text-primary" />}
                      {activity.type === "gallery" && <Image className="w-5 h-5 text-secondary" />}
                      {activity.type === "event" && <Calendar className="w-5 h-5 text-accent" />}
                      <span>{activity.message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Committee Highlights */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Committee Highlights</h2>
                <p className="text-base-content/80">Programs Committee meeting this Thursday.</p>
                <button className="btn btn-primary btn-sm mt-3">Join Technical Projects Committee</button>
              </div>
            </div>

            {/* Photo of the Week */}
            <div className="card bg-base-100 shadow-xl cursor-pointer">
              <div className="card-body">
                <h2 className="card-title">Photo of the Week</h2>
                <img
                  src="https://source.unsplash.com/random/400x300/?technology,students"
                  alt="Photo of the Week"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardPageCopy;