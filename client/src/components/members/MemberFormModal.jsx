import React from 'react';
import { MemberForm } from './MemberForm';

export const MemberFormModal = ({ isOpen, memberId, onClose }) => {
    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box w-full max-w-lg">
                <h3 className="font-bold text-lg mb-4">
                    {memberId ? 'Edit Member' : 'Add New Member'}
                </h3>
                <MemberForm memberId={memberId} onClose={onClose} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};
