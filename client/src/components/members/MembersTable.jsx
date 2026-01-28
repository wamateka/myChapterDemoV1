import React, { useEffect, useState } from 'react';
import { useMemberStore } from '../../stores/useMemberStore';

export const MembersTable = ({ onViewMember, onEditMember, onDeleteMember, selectedMembers, onSelectionChange }) => {
    const { membersList, loading } = useMemberStore();

    useEffect(() => {   
        console.log("membersList updated", membersList);
    },[membersList]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            onSelectionChange(membersList.map(m => m.id));
        } else {
            onSelectionChange([]);
        }
    };

    const handleSelectMember = (memberId) => {
        const newSelection = selectedMembers.includes(memberId)
            ? selectedMembers.filter(id => id !== memberId)
            : [...selectedMembers, memberId];
        onSelectionChange(newSelection);
    };

    const getRoleBadge = (role) => {
        const roleColors = {
            admin: 'badge-error',
            officer: 'badge-warning',
            member: 'badge-info',
        };
        return <div className={`badge ${roleColors[role] || 'badge-ghost'}`}>{role}</div>;
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            active: 'badge-success',
            inactive: 'badge-warning',
            alumni: 'badge-ghost',
        };
        return <div className={`badge ${statusColors[status] || 'badge-ghost'}`}>{status}</div>;
    };

    const getDuesBadge = (duesPaid) => {
        return (
            <div className={`badge ${duesPaid ? 'badge-success' : 'badge-error'}`}>
                {duesPaid ? 'Paid' : 'Unpaid'}
            </div>
        );
    };

    if (loading && membersList.length === 0) {
        return (
            <div className="flex justify-center items-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th className="w-12">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={selectedMembers.length === membersList.length && membersList.length > 0}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Local Dues</th>
                        <th>National Dues</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {membersList.map((member) => (
                        <tr key={member.member_id} className="hover">
                            <td>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={selectedMembers.includes(member.member_id)}
                                    onChange={() => handleSelectMember(member.member_id)}
                                />
                            </td>
                            <td className="font-medium">
                                {member.first_name} {member.last_name}
                            </td>
                            <td className="text-sm">{member.email}</td>
                            <td>{getRoleBadge(member.role)}</td>
                            <td>{getStatusBadge(member.status)}</td>
                            <td>{getDuesBadge(member.local_dues)}</td>
                            <td>{getDuesBadge(member.national_dues)}</td>
                            <td className="text-sm font-semibold">{member.total_points || 0}</td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <button className="btn btn-xs btn-ghost">⋮</button>
                                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        {/* <li >
                                            <button onClick={()=>{
                                                console.log("View member", member.member_id);
                                                onViewMember(member.member_id);
                                            }}>👁️ View</button>
                                        </li> */}
                                        <li>
                                            <button onClick={() => onEditMember(member.member_id)}>
                                                ✏️ Edit
                                            </button>
                                        </li>
                                        {member.status === 'active' && (
                                            <li>
                                                <button onClick={() => onDeleteMember(member.member_id, 'deactivate')}>
                                                    🔒 Deactivate
                                                </button>
                                            </li>
                                        )}
                                        {member.role === 'admin' && (
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Permanently delete this member?')) {
                                                            onDeleteMember(member.id, 'delete');
                                                        }
                                                    }}
                                                    className="text-error"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {membersList.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                    <p>No members found</p>
                </div>
            )}
        </div>
    );
};
