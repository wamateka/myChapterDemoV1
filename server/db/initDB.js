import { sql } from "./dbConnection.js";

function printSuccess() {
    console.log("✅ NSBE Web App Database Schema Initialized:");
    console.log(" - Zones table created");
    console.log(" - Members table created");
    console.log(" - EBoard table created");
    console.log(" - Committees table created");
    console.log(" - CommitteeMembership table created");
    console.log(" - Events table created");
    console.log(" - Attendance table created");
    console.log(" - BlogPosts table created");
    console.log(" - GalleryImages table created");
    console.log(" - PointsLog table created");
    console.log("📌 Indexes created for performance optimization");
    console.log("🎉 All tables successfully initialized!");
}

async function initDB() {
    try {
        // Create tables
        // Zones table
        await sql`
        CREATE TABLE Zones (
        zone_id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        `
        // Members table
        await sql`
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
        `
        // EBoard table
        await sql`
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
        `
        // Committees table
        await sql`
        CREATE TABLE Committees (
    committee_id SERIAL PRIMARY KEY,
    zone_id INT REFERENCES Zones(zone_id) ON DELETE SET NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
        `
        //committee membership table
        await sql`
        CREATE TABLE CommitteeMembership (
    committee_membership_id SERIAL PRIMARY KEY,
    committee_id INT NOT NULL REFERENCES Committees(committee_id) ON DELETE CASCADE,
    member_id INT NOT NULL REFERENCES Members(member_id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    UNIQUE(committee_id, member_id)
);`
        // Events table
await sql`
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

`
        // Attendance table
await sql`
CREATE TABLE Attendance (
    attendance_id SERIAL PRIMARY KEY,
    member_id INT NOT NULL REFERENCES Members(member_id) ON DELETE CASCADE,
    event_id INT NOT NULL REFERENCES Events(event_id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'excused')),
    checked_in_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(member_id, event_id)
);
`
//blog posts table
await sql`
CREATE TABLE BlogPosts (
    blog_post_id SERIAL PRIMARY KEY,
    author_member_id INT REFERENCES Members(member_id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    like_count INT NOT NULL DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`
//gallery images table
await sql`
CREATE TABLE GalleryImages (
    gallery_image_id SERIAL PRIMARY KEY,
    member_id INT REFERENCES Members(member_id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
//pointsLog table
await sql`
CREATE TABLE PointsLog (
    points_log_id SERIAL PRIMARY KEY,
    member_id INT NOT NULL REFERENCES Members(member_id) ON DELETE CASCADE,
    points INT NOT NULL,
    source_type VARCHAR(50) NOT NULL,  -- e.g., 'event', 'committee_leadership', 'other'
    source_id INT,  -- event_id, committee_membership_id, etc. depending on source_type
    description TEXT,
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`
        printSuccess();
    } catch (err) {
        console.log(`Error seting up database: `, err);
    }
}
initDB();
