import React, { useEffect, useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import { CalendarDays, MapPin, Users, Award, Clock, KeyRound, Loader2, QrCode } from 'lucide-react';
import { useEventStore } from '../stores/useEventStore';
import { useParams, Link, useNavigate } from 'react-router-dom';

function EventPage() {
  const { user, isAdmin } = useAuth();
  const { fetchEvent, loading, getCheckinCode, generateCheckinCode} = useEventStore();
  const [event, setEvent] = useState();
  const [message, setMessage] = useState(null);
  const [checkinCode, setCheckinCode] = useState('');
  const [generatingCode, setGeneratingCode] = useState(false);
  const id = useParams().id;
  const navigate = useNavigate();
  // const url = 
  useEffect(() => {
    async function loadData() {
      const e = await fetchEvent(id);
      setEvent(e);
    };
    //change this 
    setMessage({ text: 'checkin', type: 'success' })
    loadData();
  }, [])
  async function getCode(id){
    const code = await getCheckinCode(id);
    return code;
  };
  async function handleGenerateCode(id){
    setGeneratingCode(true);
    await generateCheckinCode(id);
    const updatedEvent = await fetchEvent(id);
    setEvent(updatedEvent);
    setGeneratingCode(false);
  }
  if (loading || !event) {
    return (
      <span className="loading loading-spinner loading-lg"></span>
    )
  }
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-lg overflow-hidden">
        {/*Event Header Image*/}

        <figure className="relative">
          <img
            src={event?.poster_img_url}
            alt="event poster"
            className="w-full h-56 object-contain"
          />
        </figure>

        <div className="p-8 space-y-6">
          {/* Title */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-1">{event.title}</h1>
              <p className="text-gray-500 text-sm">{event.description}</p>
            </div>
            <span className="badge badge-lg badge-primary">{event.status}</span>
          </div>
          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-700">
                <CalendarDays className="w-5 h-5 text-primary" />
                <span>{new Date(event.start_datetime).toLocaleDateString()}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-primary" />
                <span>
                  {new Date(event.start_datetime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                  {' - '}
                  {new Date(event.end_datetime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                </span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{event.location}</span>
              </p>
            </div>

            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-primary" />
                <span>{event.rsvp_count} RSVPs</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Award className="w-5 h-5 text-primary" />
                <span>{event.point_value} Points</span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>
          {/* Check-in Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" /> Event Check-In
            </h2>
            <p className="text-sm text-gray-500">Enter the check-in code or scan the QR code shown at the event.</p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                value={checkinCode}
                onChange={(e) => setCheckinCode(e.target.value.toUpperCase())}
                className="input input-bordered w-full max-w-xs uppercase text-center tracking-widest"
              />
                <button
                disabled={checkinCode.length === 0}
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/checkin/${event.event_id}/${checkinCode}`);
                }}
              >
                {false ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} /> Checking...
                  </>
                ) : (
                  'Check In'
                )}
              </button>

            </div>

            {message && (
              <div className={`alert mt-3 ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                <span>{message.text}</span>
              </div>
            )}
          </div>

          {/*admin tools*/}
          {isAdmin &&
            (<>
              <div className="divider"></div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Admin Tools</h2>
                <div className="flex flex-wrap gap-3 mt-3">
                <button
                  className="btn btn-outline btn-primary gap-2"
                  onClick={async () => await handleGenerateCode(event.event_id)}
                >
                  <QrCode className="w-5 h-5" /> Generate Code
                </button>

                <button className="btn btn-outline btn-secondary">Edit Event</button>
                <button className="btn btn-outline btn-accent">View Attendance</button>
              </div>
              {event.checkincode && (
              <div className="mt-4"><QRCodeSVG value={`${window.location.origin}/checkin/${event?.checkincode}`} size={128} />code:{event.checkincode}</div>
              )}
              </div>
            </>)
          }

        </div>

      </div>

    </div>
  )
}

export default EventPage
