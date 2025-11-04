import React, { useEffect } from 'react'
import{Link} from 'react-router-dom'
import {Plus, Users, Award, Settings, BarChart3, Calendar, FileText, Camera, ArrowBigRight, ArrowRight} from 'lucide-react'
import { useAdminEventStore } from '../../stores/useAdminEventsStore'
import { useMemberStore } from '../../stores/useMemberStore';

function AdminPanelPage() {
const {events, getAttendance, getAttendanceById, attendances} =  useAdminEventStore();
const {memberCount, getMemberCount} = useMemberStore();
useEffect(()=>{
  getMemberCount();
},[])

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-base-content/70">Manage your NSBE chapter</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-figure text-primary">
              <Users className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Members</div>
            <div className="stat-value text-primary">{memberCount}</div>
            <div className="stat-desc">Active chapter members</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-figure text-success">
              <Award className="w-8 h-8" />
            </div>
            <div className="stat-title">Dues Paid</div>
            <div className="stat-value text-success">{5}</div>
            <div className="stat-desc">Members with paid dues</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-figure text-secondary">
              <Settings className="w-8 h-8" />
            </div>
            <div className="stat-title">Admins</div>
            <div className="stat-value text-secondary">{6}</div>
            <div className="stat-desc">Administrative users</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-figure text-accent">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div className="stat-title">Avg Points</div>
            <div className="stat-value text-accent">{3}</div>
            <div className="stat-desc">Average member points</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/events" className="card bg-base-100 shadow-xl card-hover">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="card-title">Manage Events</h3>
                  <p className="text-sm text-base-content/70">Create and manage chapter events</p>
                </div>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">
                  
                  Add Event
                  <ArrowRight className="w-4 h-4 mr-2" />
                </button>
              </div>
            </div>
          </Link>

          <Link to="/admin/blogs" className="card bg-base-100 shadow-xl card-hover">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="card-title">Blog Management</h3>
                  <p className="text-sm text-base-content/70">Publish announcements and articles</p>
                </div>
              </div>
              <div className="card-actions justify-end">
                <Link 
                    to="/blogs/create"
                    className="btn btn-primary btn-sm"
                    onClick={e => {e.stopPropagation()}}
                    >
                  New Post
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/admin/attendance" className="card bg-base-100 shadow-xl card-hover">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="card-title">Attendance</h3>
                  <p className="text-sm text-base-content/70">Track event attendance and points</p>
                </div>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">
                  Record Attendance
                  <ArrowRight className="w-4 h-4 mr-2" />
                </button>
              </div>
            </div>
          </Link>

          <Link to="/gallery" className="card bg-base-100 shadow-xl card-hover">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <Camera className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="card-title">Gallery</h3>
                  <p className="text-sm text-base-content/70">Manage event photos</p>
                </div>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">
                  Upload Photos
                  <ArrowRight className="w-4 h-4 mr-2" />
                </button>
              </div>
            </div>
          </Link>

          <div className="card bg-base-100 shadow-xl card-hover">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="card-title">Member Management</h3>
                  <p className="text-sm text-base-content/70">View and manage member data</p>
                </div>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">
                  View Members
                  <ArrowRight className="w-4 h-4 mr-2" />
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl card-hover">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <BarChart3 className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="card-title">Reports</h3>
                  <p className="text-sm text-base-content/70">Generate chapter reports</p>
                </div>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">
                  View Reports
                  <ArrowRight className="w-4 h-4 mr-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <div>
                  <p className="font-semibold">New member registered</p>
                  <p className="text-sm text-base-content/70">John Doe joined the chapter</p>
                </div>
                <span className="text-xs text-base-content/50 ml-auto">2 hours ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div>
                  <p className="font-semibold">Event created</p>
                  <p className="text-sm text-base-content/70">Workshop: Resume Building</p>
                </div>
                <span className="text-xs text-base-content/50 ml-auto">1 day ago</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <div>
                  <p className="font-semibold">Blog post published</p>
                  <p className="text-sm text-base-content/70">Welcome to the new semester</p>
                </div>
                <span className="text-xs text-base-content/50 ml-auto">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanelPage
