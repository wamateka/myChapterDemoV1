import React, { useEffect, useState } from 'react'
import { Users, Crown, PlusCircle, UserStar, CameraIcon, Edit2Icon } from "lucide-react";
import { useUserStore } from '../stores/useUserStore';
import EditProfileModal from '../components/EditProfileModal';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
    const { user } = useAuth();
    const { getProfile, profile, updateProfileImage } = useUserStore();
    useEffect(() => {
        getProfile(user.member_id);
    }, [])

    function changeProfileImage(e){
        const file = e.target.files[0]
        e.preventDefault();
        updateProfileImage(user.member_id, file);
    }
    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-6 space-y-8">
            {/* Profile Section */}
            <div className="w-full rounded-2xl shadow-lg bg-background relative">
                <div className="flex items-center gap-6 p-6">
                    <div className="relative">
                        <img
                            src={profile.profile_picture}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md"
                        />
                        <label className='cursor-pointer  absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:bg-primary/90'>
                            <CameraIcon className="w-4 h-4" />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => changeProfileImage(e)} // handle uploaded file
                            />
                        </label>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">{profile.first_name} {profile.last_name}</h1>
                        <p className="text-muted-foreground text-sm">{profile.year_in_college || '----'}</p>
                    </div>
                </div>
                <button
                    onClick={() => { document.getElementById("edit_profile_modal").showModal(); console.log('showing modal') }}
                    className="absolute top-4 right-4 flex items-center gap-2 shadow-md bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3 py-2 text-sm font-medium">
                    <Edit2Icon className="w-4 h-4" /> Edit Profile
                </button>
            </div>

            {/* General Information Section */}
            <div className="w-full rounded-2xl shadow-lg bg-background">
                <div className="p-6 space-y-3">
                    <h2 className="text-xl font-semibold text-primary border-b border-muted pb-2">General Information</h2>
                    {[{
                        label: "Email",
                        value: profile.email
                    },
                    {
                        label: "Phone number",
                        value: profile.phone_number || '----'
                    },
                    {
                        label: "NSBE ID",
                        value: profile.nsbe_id || '----'
                    }, {
                        label: "Membership Type",
                        value: profile.nsbe_membership_type || '----'

                    }, {
                        label: "Major",
                        value: profile.major
                    },
                    {
                        label: "Year",
                        value: profile.year_in_college || '----'
                    },
                    {
                        label: "Graduation Year",
                        value: profile.graduation_year || '----'
                    }, {
                        label: "Local Dues Paid",
                        value: profile.local_dues ? "Yes" : "No"
                    }, {
                        label: "National Dues Paid",
                        value: profile.national_dues ? "Yes" : "No"
                    }].map((info, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{info.label}:</span>
                            <span className="font-semibold text-primary">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Roles & Committees Section */}
            <div className="w-full rounded-2xl shadow-lg bg-background">
                <div className="p-6 space-y-5">
                    <h2 className="text-xl font-semibold text-primary border-b border-muted pb-2">Roles & Committees</h2>

                    {/* E-board Info */}
                    {profile.eboard_position && (
                        <div className="p-5 rounded-xl border border-primary/30 shadow-md bg-primary/10 flex items-center gap-4">
                            <UserStar className="w-7 h-7 text-primary" />
                            <div>
                                <p className="font-semibold text-primary">E-Board</p>
                                <p className="text-sm text-primary/80">
                                    {profile.eboard_position} - {profile.zone_name}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Committees Info */}
                    {profile.committees && profile.committees.split(',').length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {profile.committees.split(',').map((committee, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-xl border border-accent/30 bg-accent/10 shadow-md hover:shadow-lg transition flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <Users className="w-6 h-6 text-accent" />
                                        <h3 className="font-semibold text-accent">{committee.split('-')[0]}</h3>
                                    </div>
                                    <p className="text-sm text-accent/80 ml-9">{committee.split('-')[1]}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center space-y-3">
                            <p className="text-muted-foreground font-medium">
                                You are not part of any committee yet.
                            </p>
                            <button className="flex items-center gap-2 shadow-md bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2">
                                <PlusCircle className="w-4 h-4" /> Join a Committee
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <EditProfileModal />
        </div>
    )
}

export default ProfilePage
