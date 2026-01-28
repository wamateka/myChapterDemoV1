import React from 'react';
import { useMemberStore } from '../../stores/useMemberStore';

export const BulkActionsDropdown = ({ selectedMembers, onActionComplete }) => {
    const { bulkUpdateMembers, loading } = useMemberStore();

    const handleBulkStatusChange = async (status) => {
        if (selectedMembers.length === 0) return;
        await bulkUpdateMembers(selectedMembers, { status });
        onActionComplete();
    };

    const handleBulkRoleChange = async (role) => {
        if (selectedMembers.length === 0) return;
        await bulkUpdateMembers(selectedMembers, { role });
        onActionComplete();
    };

    const handleBulkDuesChange = async (duesPaid) => {
        if (selectedMembers.length === 0) return;
        await bulkUpdateMembers(selectedMembers, { duesPaid });
        onActionComplete();
    };

    if (selectedMembers.length === 0) {
        return null;
    }

    return (
        <div className="dropdown dropdown-end">
            <button className="btn btn-outline btn-sm" disabled={loading}>
                ⚙️ Bulk Actions
            </button>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li className="menu-title">
                    <span>Change Status</span>
                </li>
                <li>
                    <a onClick={() => handleBulkStatusChange('active')} disabled={loading}>
                        Active
                    </a>
                </li>
                <li>
                    <a onClick={() => handleBulkStatusChange('inactive')} disabled={loading}>
                        Inactive
                    </a>
                </li>
                <li>
                    <a onClick={() => handleBulkStatusChange('alumni')} disabled={loading}>
                        Alumni
                    </a>
                </li>

                <li className="divider my-1"></li>
                <li className="menu-title">
                    <span>Change Role</span>
                </li>
                <li>
                    <a onClick={() => handleBulkRoleChange('member')} disabled={loading}>
                        Member
                    </a>
                </li>
                <li>
                    <a onClick={() => handleBulkRoleChange('officer')} disabled={loading}>
                        Officer
                    </a>
                </li>
                <li>
                    <a onClick={() => handleBulkRoleChange('admin')} disabled={loading}>
                        Admin
                    </a>
                </li>

                <li className="divider my-1"></li>
                <li className="menu-title">
                    <span>Dues</span>
                </li>
                <li>
                    <a onClick={() => handleBulkDuesChange(true)} disabled={loading}>
                        ✓ Mark Paid
                    </a>
                </li>
                <li>
                    <a onClick={() => handleBulkDuesChange(false)} disabled={loading}>
                        ✕ Mark Unpaid
                    </a>
                </li>
            </ul>
        </div>
    );
};
