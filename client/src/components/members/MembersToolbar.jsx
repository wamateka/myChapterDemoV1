import React from 'react';
import { useMemberStore } from '../../stores/useMemberStore';

export const MembersToolbar = ({ onAddMember, selectedCount }) => {
    const { setSearch, setStatusFilter, setRoleFilter, setDuesFilter, filters } = useMemberStore();

    return (
        <div className="space-y-4">
            {/* Top row: Search + Add button */}
            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search by name, email, NSBE ID..."
                    className="input input-bordered flex-1 input-sm"
                    value={filters.search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="btn btn-primary btn-sm"
                    onClick={onAddMember}
                >
                    + Add Member
                </button>
            </div>

            {/* Filter row */}
            <div className="flex flex-wrap gap-4">
                <select
                    className="select select-bordered select-sm"
                    value={filters.status}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="alumni">Alumni</option>
                </select>

                <select
                    className="select select-bordered select-sm"
                    value={filters.role}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="all">All Roles</option>
                    <option value="member">Member</option>
                    <option value="officer">Officer</option>
                    <option value="admin">Admin</option>
                </select>

                <select
                    className="select select-bordered select-sm"
                    value={filters.dues}
                    onChange={(e) => setDuesFilter(e.target.value)}
                >
                    <option value="all">All Dues</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>
            </div>

            {/* Selection info */}
            {selectedCount > 0 && (
                <div className="alert alert-info">
                    <span>{selectedCount} member(s) selected</span>
                </div>
            )}
        </div>
    );
};
