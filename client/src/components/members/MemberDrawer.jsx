import React, { useEffect, useState } from 'react';
import { useMemberStore } from '../../stores/useMemberStore';

export const MemberDrawer = ({ memberId, isOpen, onClose }) => {
    const { getMemberById, selectedMember, updateMember, loading } = useMemberStore();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        if (isOpen && memberId) {
            getMemberById(memberId);
        }
    }, [isOpen, memberId, getMemberById]);

    useEffect(() => {
        if (selectedMember) {
            setEditData(selectedMember);
        }
    }, [selectedMember]);

    if (!selectedMember || !isOpen) return null;

    const handleFieldChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        await updateMember(selectedMember.member_id, editData);
        setIsEditing(false);
    };

    return (
        <div className={`drawer drawer-end ${isOpen ? 'drawer-open' : ''}`}>
            <input id="member-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={onClose} />
            <div className="drawer-side">
                <label htmlFor="member-drawer" className="drawer-overlay"></label>
                <div className="p-4 w-80 min-h-full bg-base-100 space-y-4">
                    <button className="btn btn-ghost btn-sm float-right" onClick={onClose}>✕</button>

                    {/* Header */}
                    <div className="clear-both pt-4">
                        <h2 className="text-xl font-bold">
                            {selectedMember.first_name} {selectedMember.last_name}
                        </h2>
                        <p className="text-sm text-gray-500">{selectedMember.email}</p>
                    </div>

                    {/* Tabs */}
                    <div className="tabs tabs-bordered w-full">
                        <a
                            className={`tab ${activeTab === 'profile' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </a>
                        <a
                            className={`tab ${activeTab === 'attendance' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('attendance')}
                        >
                            Attendance
                        </a>
                        <a
                            className={`tab ${activeTab === 'notes' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('notes')}
                        >
                            Notes
                        </a>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'profile' && (
                        <div className="space-y-4">
                            {!isEditing ? (
                                // View Mode
                                <>
                                    <div>
                                        <p className="text-xs text-gray-500">Role</p>
                                        <p className="font-medium">{selectedMember.role}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        <div className={`badge ${selectedMember.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                                            {selectedMember.status}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Dues</p>
                                        <div className={`badge ${selectedMember.duesPaid ? 'badge-success' : 'badge-error'}`}>
                                            {selectedMember.duesPaid ? 'Paid' : 'Unpaid'}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Points</p>
                                        <p className="font-bold text-lg">{selectedMember.pointsTotal || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Major</p>
                                        <p>{selectedMember.major || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Classification</p>
                                        <p>{selectedMember.classification || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Graduation Year</p>
                                        <p>{selectedMember.graduationYear || 'N/A'}</p>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-outline w-full"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </button>
                                </>
                            ) : (
                                // Edit Mode
                                <>
                                    <div className="space-y-3">
                                        <select
                                            className="select select-bordered select-sm w-full"
                                            value={editData.status}
                                            onChange={(e) => handleFieldChange('status', e.target.value)}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="alumni">Alumni</option>
                                        </select>

                                        <select
                                            className="select select-bordered select-sm w-full"
                                            value={editData.role}
                                            onChange={(e) => handleFieldChange('role', e.target.value)}
                                        >
                                            <option value="member">Member</option>
                                            <option value="officer">Officer</option>
                                            <option value="admin">Admin</option>
                                        </select>

                                        <label className="label cursor-pointer justify-start gap-3">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={editData.duesPaid}
                                                onChange={(e) => handleFieldChange('duesPaid', e.target.checked)}
                                            />
                                            <span className="label-text text-sm">Dues Paid</span>
                                        </label>
                                    </div>

                                    <div className="divider my-2"></div>

                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-sm btn-ghost flex-1"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-sm btn-primary flex-1"
                                            onClick={handleSave}
                                            disabled={loading}
                                        >
                                            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Save'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500">TODO: Fetch and display attendance history</p>
                            <div className="text-xs text-gray-400">
                                <p>• Endpoint: GET /attendances/member/:id</p>
                                <p>• Show event name, date, check-in time</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500">Admin notes (officers only)</p>
                            <textarea
                                className="textarea textarea-bordered w-full h-32 text-sm"
                                placeholder="Add internal notes here..."
                                // TODO: Connect to notes API endpoint
                            ></textarea>
                            <button className="btn btn-primary btn-sm w-full">
                                Save Note
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
