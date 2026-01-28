import React, { useEffect, useState } from 'react';
import { useMemberStore } from '../../stores/useMemberStore';

export const MemberForm = ({ memberId = null, onClose }) => {
    const { getMemberById, selectedMember, createMember, updateMember } = useMemberStore();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        role: 'member',
        status: 'active',
        local_dues: false,
        national_dues: false,
        nsbe_membership_type: '',
        major: '',
        year_in_college: '',
        graduation_year: new Date().getFullYear() + 4,
    });

    useEffect(() => {
        if (memberId) {
            const loadMember = async () => {
                setIsLoading(true);
                const member = await getMemberById(memberId);
                if (member) {
                    setFormData({
                        first_name: member.first_name || '',
                        last_name: member.last_name || '',
                        email: member.email || '',
                        role: member.role || 'member',
                        status: member.status || 'active',
                        local_dues: member.local_dues || false,
                        national_dues: member.national_dues || false,
                        classification: member.classification || '',
                        major: member.major || '',
                        graduationYear: member.graduationYear || '',
                    });
                }
                setIsLoading(false);
            };
            loadMember();
        }
    }, [memberId, getMemberById]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'graduationYear' ? parseInt(value) : value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        if (memberId) {
            await updateMember(memberId, formData);
        } else {
            await createMember(formData);
        }
        setIsLoading(false);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm font-medium">First Name *</span>
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="John"
                        className="input input-bordered input-sm"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Last Name *</span>
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Doe"
                        className="input input-bordered input-sm"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Email *</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className="input input-bordered input-sm"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-control col-span-2">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Phone Number</span>
                    </label>
                    <input
                        type="tel"
                        name="phone_number"
                        placeholder="+1 (555) 000-0000"
                        className="input input-bordered input-sm"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Role</span>
                    </label>
                    <select
                        name="role"
                        className="select select-bordered select-sm"
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option value="member">Member</option>
                        <option value="officer">Officer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Status</span>
                    </label>
                    <select
                        name="status"
                        className="select select-bordered select-sm"
                        value={formData.status}
                        onChange={handleInputChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="alumni">Alumni</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Major</span>
                    </label>
                    <input
                        type="text"
                        name="major"
                        placeholder="Computer Science"
                        className="input input-bordered input-sm"
                        value={formData.major}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Year in College</span>
                    </label>
                    <input
                        type="text"
                        name="year_in_college"
                        placeholder="Freshman"
                        className="input input-bordered input-sm"
                        value={formData.year_in_college}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm font-medium">Graduation Year</span>
                    </label>
                    <input
                        type="number"
                        name="graduation_year"
                        className="input input-bordered input-sm"
                        value={formData.graduation_year}
                        onChange={handleInputChange}
                    />
                </div>

                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text text-sm font-medium">NSBE Membership Type</span>
                    </label>
                    <input
                        type="text"
                        name="nsbe_membership_type"
                        placeholder="e.g., Standard, Premium"
                        className="input input-bordered input-sm"
                        value={formData.nsbe_membership_type}
                        onChange={handleInputChange}
                    />
                </div> */}

                <div className="form-control col-span-2">
                    <label className="label cursor-pointer justify-start gap-3">
                        <input
                            type="checkbox"
                            name="local_dues"
                            className="checkbox checkbox-sm"
                            checked={formData.local_dues}
                            onChange={handleInputChange}
                        />
                        <span className="label-text text-sm">Local Dues Paid</span>
                    </label>
                </div>

                <div className="form-control col-span-2">
                    <label className="label cursor-pointer justify-start gap-3">
                        <input
                            type="checkbox"
                            name="national_dues"
                            className="checkbox checkbox-sm"
                            checked={formData.national_dues}
                            onChange={handleInputChange}
                        />
                        <span className="label-text text-sm">National Dues Paid</span>
                    </label>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={isLoading}
                >
                    {isLoading ? <span className="loading loading-spinner loading-sm"></span> : null}
                    {memberId ? 'Update Member' : 'Add Member'}
                </button>
            </div>
        </form>
    );
};
