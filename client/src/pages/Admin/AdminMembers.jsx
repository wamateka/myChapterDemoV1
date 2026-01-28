import React, { useState, useEffect } from 'react';
import { useMemberStore } from '../../stores/useMemberStore';
import { MembersToolbar } from '../../components/members/MembersToolbar';
import { MembersTable } from '../../components/members/MembersTable';
import { MemberDrawer } from '../../components/members/MemberDrawer';
import { MemberFormModal } from '../../components/members/MemberFormModal';
import { BulkActionsDropdown } from '../../components/members/BulkActionsDropdown';
import {ArrowLeftIcon} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
function AdminMembers() {
    const { getMemberList, deactivateMember, deleteMember } = useMemberStore();
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [editingMemberId, setEditingMemberId] = useState(null);
    const navigate = useNavigate();
    // Load members on mount
    useEffect(() => {
        getMemberList();
    }, [getMemberList]);

    const handleViewMember = (id) => {
        console.log("Viewing member", id);
        setSelectedMemberId(id);
        setDrawerOpen(true);
    };

    const handleEditMember = (id) => {
        setEditingMemberId(id);
        setFormModalOpen(true);
    };

    const handleAddMember = () => {
        setEditingMemberId(null);
        setFormModalOpen(true);
    };

    const handleDeleteMember = async (id, type) => {
        if (type === 'deactivate') {
            await deactivateMember(id);
        } else if (type === 'delete') {
            await deleteMember(id);
        }
    };

    const handleFormModalClose = () => {
        setFormModalOpen(false);
        setEditingMemberId(null);
    };

    const handleBulkActionComplete = () => {
        setSelectedMembers([]);
    };

    return (
        <div className="space-y-6 p-6">
            <button onClick={() => { navigate("/admin") }} className='btn btn-ghost mb-8'>
                    <ArrowLeftIcon className='size-4 mr-2' />
                    Back to admin page
            </button>
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">Members Management</h1>
                <p className="text-gray-500 text-sm mt-1">Manage all chapter members, roles, and status</p>
            </div>

            {/* Toolbar */}
            <MembersToolbar
                onAddMember={handleAddMember}
                selectedCount={selectedMembers.length}
            />

            {/* Actions Bar */}
            {selectedMembers.length > 0 && (
                <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <span className="text-sm font-medium text-blue-900">
                        {selectedMembers.length} member(s) selected
                    </span>
                    <BulkActionsDropdown
                        selectedMembers={selectedMembers}
                        onActionComplete={handleBulkActionComplete}
                    />
                </div>
            )}

            {/* Members Table */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body p-0">
                    <MembersTable
                        onViewMember={handleViewMember}
                        onEditMember={handleEditMember}
                        onDeleteMember={handleDeleteMember}
                        selectedMembers={selectedMembers}
                        onSelectionChange={setSelectedMembers}
                    />
                </div>
            </div>

            {/* Member Detail Drawer */}
            <MemberDrawer
                memberId={selectedMemberId}
                isOpen={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    setSelectedMemberId(null);
                }}
            />

            {/* Form Modal */}
            <MemberFormModal
                isOpen={formModalOpen}
                memberId={editingMemberId}
                onClose={handleFormModalClose}
            />
        </div>
    );
}

export default AdminMembers;
