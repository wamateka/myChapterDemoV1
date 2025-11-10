import React from 'react'
import { useEffect } from 'react';
import { useEventStore } from '../stores/useEventStore';
import DisplayEventCard from '../components/DisplayEventCard';
import { Badge, Link } from 'lucide-react';
import { useRSVPStore } from '../stores/useRSVPStore';

function EventsPage() {
  const { filter, setFilter, events, filteredEvents, loading, error, fetchEvents, filterEvents } = useEventStore();
  useEffect(() => {
    setFilter('all')
    fetchEvents();
  }, [fetchEvents]);


  function handleFilterChange(newFilter){
    setFilter(newFilter);
    filterEvents();
  };
  function getEventStatus(e){
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">NSBE Events</h1>
          <p className="text-lg text-base-content/70">
            Discover upcoming workshops, networking events, and professional development opportunities
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed">
            <button
              className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All Events
            </button>
            <button
              className={`tab ${filter === 'upcoming' ? 'tab-active' : ''}`}
              onClick={() => handleFilterChange('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`tab ${filter === 'ongoing' ? 'tab-active' : ''}`}
              onClick={() => handleFilterChange('ongoing')}
            >
              Ongoing
            </button>
            <button
              className={`tab ${filter === 'past' ? 'tab-active' : ''}`}
              onClick={() => handleFilterChange('past')}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events List */}
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='loading loading-spinner loading-lg' />
          </div>
        ) : filteredEvents?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-base-content/70">
              {filter === 'all'
                ? 'No events have been created yet.'
                : `No ${filter} events found.`
              }
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredEvents?.map(e => (
              
              <DisplayEventCard
                key={e.event_id}
                id = {e.event_id}
                imgUrl={e.poster_img_url}
                title={e.title}
                description={e.description}
                status={getEventStatus(e)}
                date={new Date(e.start_datetime).toLocaleDateString()}
                start_time={new Date(e.start_datetime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                end_time={new Date(e.end_datetime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                location={e.location}
                rsvp_count={e.rsvp_count}
                max_attendee={e.max_attendee}
                points={e.point_value}
                attendees={e.attendee_count}
                rsvp_status={e.status}
              />
            ))
            }
          </div>
        )
        }
      </div>
    </div>
  )
}

export default EventsPage
