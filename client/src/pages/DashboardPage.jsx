import React, { useEffect } from 'react'
import { useUserStore } from '../stores/useUserStore'
import{Edit, Save,User,Phone,GraduationCap,Award,Calendar,Clock,MapPin} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
function DashBoardPage() {
  const {user, loadingUser} = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(user); 
  },[])
    // useEffect(()=>{
    //     getUser();
    // }, [getUser]);
    const recentActivity= []
    const recentRSVPs = [{ide: 1, title: 'ab', status: 'attended', event_date: new Date(2025, 5, 6), location: 'library' }, {ide: 2, title: 'cd', status: 'rsvp', event_date: new Date(2025, 7, 23), location: 'park' } ]
    const isEditing = false;
    const setIsEditing = () => {};

      if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }
    
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-base-content/70">Welcome back, {user?.first_name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-ghost btn-sm"
                  >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">
                          <span className="label-text">First Name</span>
                        </label>
                        <input
                          type="text"
                          {...register('firstName', { required: 'First name is required' })}
                          className="input input-bordered w-full"
                        />
                        {errors.firstName && (
                          <span className="text-error text-sm">{errors.firstName.message}</span>
                        )}
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text">Last Name</span>
                        </label>
                        <input
                          type="text"
                          {...register('lastName', { required: 'Last name is required' })}
                          className="input input-bordered w-full"
                        />
                        {errors.lastName && (
                          <span className="text-error text-sm">{errors.lastName.message}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Phone</span>
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Major</span>
                      </label>
                      <input
                        type="text"
                        {...register('major')}
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary btn-sm"
                      >
                        {loading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-ghost btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold">{user?.first_name} {user?.last_name}</p>
                        <p className="text-sm text-base-content/70">{user?.email}</p>
                      </div>
                    </div>

                    {user?.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>{user.phone}</span>
                      </div>
                    )}

                    {user?.major && (
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span>{user.major}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="font-semibold">{user?.points || 0} Points</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`badge ${user?.dues_paid ? 'badge-success' : 'badge-warning'}`}>
                        {user?.dues_paid ? 'Dues Paid' : 'Dues Pending'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat bg-base-100 rounded-lg shadow">
                <div className="stat-figure text-primary">
                  <Award className="w-8 h-8" />
                </div>
                <div className="stat-title">Total Points</div>
                <div className="stat-value text-primary">{user?.points || 0}</div>
                <div className="stat-desc">Earned from events</div>
              </div>

              <div className="stat bg-base-100 rounded-lg shadow">
                <div className="stat-figure text-secondary">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="stat-title">Events Attended</div>
                <div className="stat-value text-secondary">{recentRSVPs.filter(rsvp => rsvp.status === 'attended').length}</div>
                <div className="stat-desc">This semester</div>
              </div>

              <div className="stat bg-base-100 rounded-lg shadow">
                <div className="stat-figure text-accent">
                  <User className="w-8 h-8" />
                </div>
                <div className="stat-title">Member Since</div>
                <div className="stat-value text-accent">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </div>
                <div className="stat-desc">Active member</div>
              </div>
            </div>

            {/* Recent RSVPs */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Recent RSVPs</h2>
                {recentRSVPs.length === 0 ? (
                  <p className="text-base-content/70">No recent RSVPs</p>
                ) : (
                  <div className="space-y-3">
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

            {/* Recent Activity */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Recent Activity</h2>
                {recentActivity.length === 0 ? (
                  <p className="text-base-content/70">No recent activity</p>
                ) : (
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{activity.reason}</h3>
                          {activity.event_title && (
                            <p className="text-sm text-base-content/70">{activity.event_title}</p>
                          )}
                          <p className="text-xs text-base-content/50">
                            {new Date(activity.recorded_at).toDateString()}
                          </p>
                        </div>
                        <span className="badge badge-success">+{activity.points_earned} pts</span>
                      </div>
                    ))}
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

export default DashBoardPage
