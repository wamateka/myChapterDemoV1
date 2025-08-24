import { React, useEffect, useState } from 'react'
import { useUserStore } from '../stores/useUserStore'

import { User, Mail, Phone, GraduationCap, IdCard, SaveIcon } from "lucide-react";
import { Camera, CircleX, File, PlusCircleIcon, Text, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext';

function EditProfileModal() {
    const {user} = useAuth()
    const { formData, loading, updateProfile, setformData, resetformData, getProfile, profile } = useUserStore();
    useEffect(()=>{
        const formData = {
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.email ,
            phone_number: profile.phone_number,
            nsbe_id: profile.nsbe_id ,
            membership_type: profile.nsbe_membership_type,
            major: profile.major,
            college_year: profile.year_in_college,
            graduation_year: profile.graduation_year ,
            national_dues: profile.national_dues,
        }
        setformData(formData)
        console.log(profile)
        console.log(formData)

    },[profile])
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(user.member_id);
    };

    return (
        <dialog id="edit_profile_modal" className='modal'>
            <div className='modal-box'>

                <form method='dialog'>
                    <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'><CircleX /></button>
                </form>
                <div className="max-w-2xl mx-auto p-6">
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-primary-content" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold">Edit Profile</h2>
                        <p className="mt-2 text-base-content/70">
                            Update your personal information below
                        </p>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <form onSubmit={(e)=>{handleSubmit(e)}} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">First Name</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                            <input
                                                type="text"
                                                className="input input-bordered w-full pl-10"
                                                placeholder="Enter first name"
                                                value={formData?.first_name}
                                                onChange={(e) =>
                                                    setformData({ ...formData, first_name: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Last Name</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                            <input
                                                type="text"
                                                className="input input-bordered w-full pl-10"
                                                placeholder="Enter last name"
                                                value={formData?.last_name}
                                                onChange={(e) =>
                                                    setformData({ ...formData, last_name: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="label">
                                        <span className="label-text">Email Address</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                        <input
                                            type="email"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Enter your email"
                                            value={formData?.email}
                                            onChange={(e) =>
                                                setformData({ ...formData, email: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                        <input
                                            type="tel"                
                                            className="input input-bordered w-full pl-10"
                                            placeholder="(123) 456-7890"
                                            value={formData?.phone_number}
                                            onChange={(e) => {
                                                const digits = e.target.value.replace(/\D/g, "");
                                                let formatted = digits;
                                                if (digits.length > 3 && digits.length <= 6) {
                                                    formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                                                } else if (digits.length > 6) {
                                                    formatted = `(${digits.slice(0, 3)}) ${digits.slice(
                                                        3,
                                                        6
                                                    )}-${digits.slice(6, 10)}`;
                                                }
                                                setformData({ ...formData, phone_number: formatted });
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* NSBE ID */}
                                <div>
                                    <label className="label">
                                        <span className="label-text">NSBE ID</span>
                                    </label>
                                    <div className="relative">
                                        <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                        <input
                                            type="text"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Enter your NSBE ID"
                                            value={formData?.nsbe_id}
                                            onChange={(e) =>
                                                setformData({ ...formData, nsbe_id: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Membership Type */}
                                <div>
                                    <label className="label">
                                        <span className="label-text">Membership Type</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={formData?.membership_type}
                                        onChange={(e) =>
                                            setformData({ ...formData, membership_type: e.target.value })
                                        }
                                    >
                                        <option value="Collegiate Member">Collegiate Member</option>
                                        <option value="Proffesisonal Member">Professional Member</option>
                                        <option value="LifeTime Member">LifeTime Member</option>
                                    </select>
                                </div>

                                {/* Major */}
                                <div>
                                    <label className="label">
                                        <span className="label-text">Major</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        placeholder="Enter your major"
                                        value={formData?.major}
                                        onChange={(e) =>
                                            setformData({ ...formData, major: e.target.value })
                                        }
                                    />
                                </div>
                                {/* Year */}
                                <div>
                                    <label className="label">
                                        <span className="label-text">Year</span>
                                    </label>
                                    <input
                                        type="nummber"
                                        className="input input-bordered w-full"
                                        placeholder=""
                                        value={formData?.college_year}
                                        onChange={(e) =>
                                            setformData({ ...formData, college_year: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Graduation Year */}
                                <div>
                                    <label className="label">
                                        <span className="label-text">Graduation Year</span>
                                    </label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                                        <input
                                            type="number"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="YYYY"
                                            value={formData?.graduation_year}
                                            onChange={(e) =>
                                                setformData({
                                                    ...formData,
                                                    graduation_year: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* National Dues */}
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Paid National Dues?</span>
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-primary"
                                            checked={formData?.national_dues}
                                            onChange={(e) =>
                                                setformData({ ...formData, national_dues: e.target.checked })
                                            }
                                        />
                                    </label>
                                </div>
                                {/* modal actions */}
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn btn-ghost"><X className="w-4 h-4" /> Leave</button>
                                    </form>
                                    <button
                                        type="submit"
                                        className="btn btn-primary min-w-[120px]"
                                        disabled={!formData?.first_name || !formData?.last_name || !formData?.email}
                                    >
                                        {loading ? (
                                            <span className="loading loading-spinner loading-sm" />
                                        ) : (
                                            <>
                                                <SaveIcon className="size-5 mr-2" />
                                                Save
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </dialog>
    )
}

export default EditProfileModal
