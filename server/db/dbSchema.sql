-- NSBE Web App Database Schema
-- Complete Schema Including Members, Zones, Committees, Events, Attendance, BlogPosts, GalleryImages, PointsLog

-- Zones Table
CREATE TABLE Zones (
    zone_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Members Table
CREATE TABLE Members (
    member_id SERIAL PRIMARY KEY,
    nsbe_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    graduation_year INT CHECK (graduation_year >= 1900 AND graduation_year <= 2100),
    major VARCHAR(100),
    role VARCHAR(20) NOT NULL CHECK (role IN ('member', 'admin')),
    locals_dues BOOLEAN NOT NULL DEFAULT FALSE,
    national_dues BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE EBoard (
    eboard_id SERIAL PRIMARY KEY,
    member_id INT NOT NULL REFERENCES Members(member_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,  -- e.g., 'President', 'Vice-President', 'Committee Chair'
    zone_id INT REFERENCES Zones(zone_id) ON DELETE SET NULL, -- optional if EBoard roles can be zone-specific
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(member_id, title, start_date)  -- prevent duplicate same role assignment on same start date
);

-- Committees Table (belongs to a Zone)
CREATE TABLE Committees (
    committee_id SERIAL PRIMARY KEY,
    zone_id INT REFERENCES Zones(zone_id) ON DELETE SET NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CommitteeMembership Table
CREATE TABLE CommitteeMembership (
    committee_membership_id SERIAL PRIMARY KEY,
    committee_id INT NOT NULL REFERENCES Committees(committee_id) ON DELETE CASCADE,
    member_id INT NOT NULL REFERENCES Members(member_id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    UNIQUE(committee_id, member_id)
);

-- Events Table
CREATE TABLE Events (
    event_id SERIAL PRIMARY KEY,
    created_by_member_id INT REFERENCES Members(member_id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'general',
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    point_value INT CHECK (point_value >= 0) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance Table
CREATE TABLE Attendance (
    attendance_id SERIAL PRIMARY KEY,
    member_id INT NOT NULL REFERENCES Members(member_id) ON DELETE CASCADE,
    event_id INT NOT NULL REFERENCES Events(event_id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'excused')),
    checked_in_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(member_id, event_id)
);

-- BlogPosts Table
CREATE TABLE BlogPosts (
    blog_post_id SERIAL PRIMARY KEY,
    author_member_id INT REFERENCES Members(member_id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GalleryImages Table
CREATE TABLE GalleryImages (
    gallery_image_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES Members(member_id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PointsLog Table
CREATE TABLE PointsLog (
    points_log_id SERIAL PRIMARY KEY,
    member_id INT NOT NULL REFERENCES Members(member_id) ON DELETE CASCADE,
    points INT NOT NULL,
    source_type VARCHAR(50) NOT NULL,  -- e.g., 'event', 'committee_leadership', 'other'
    source_id INT,  -- event_id, committee_membership_id, etc. depending on source_type
    description TEXT,
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance optimization

CREATE INDEX idx_events_start_datetime ON Events(start_datetime);
CREATE INDEX idx_attendance_member_event ON Attendance(member_id, event_id);
CREATE INDEX idx_committee_membership_member ON CommitteeMembership(member_id);
CREATE INDEX idx_blogposts_author ON BlogPosts(author_member_id);
CREATE INDEX idx_galleryimages_member ON GalleryImages(member_id);
CREATE INDEX idx_pointslog_member ON PointsLog(member_id);
CREATE INDEX idx_committees_zone_id ON Committees(zone_id);