import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, Award, BookOpen, ArrowRight } from 'lucide-react'
function HomePage() {
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-900 text-primary-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to NSBE Chapter
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
               Our Mission is to increase the number of culturally responsible Black engineers who excel academically, succeed professionally, and positively impact the community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events" className="btn btn-secondary btn-lg">
                View Events
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/signup" className="btn btn-outline btn-lg">
                Join Our Chapter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-base-content/70">
              Discover the opportunities that await you in our NSBE chapter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card card-hover bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center">Events & Workshops</h3>
                <p className="text-base-content/70">
                  Professional development workshops, networking events, and technical sessions.
                </p>
              </div>
            </div>

            <div className="card card-hover bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center">Community</h3>
                <p className="text-base-content/70">
                  Connect with fellow engineering students and professionals.
                </p>
              </div>
            </div>

            <div className="card card-hover bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center">Leadership</h3>
                <p className="text-base-content/70">
                  Develop leadership skills through committee involvement and projects.
                </p>
              </div>
            </div>

            <div className="card card-hover bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center">Academic Support</h3>
                <p className="text-base-content/70">
                  Study groups, tutoring, and academic resources for engineering students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-lg opacity-90">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lg opacity-90">Events This Year</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Graduation Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-base-content/70 mb-8">
            Become part of a network that supports your academic and professional growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Sign Up Today
            </Link>
            <Link to="/events" className="btn btn-outline btn-lg">
              View Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
