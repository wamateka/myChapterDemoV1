import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useAttendanceStore } from '../stores/useAttendanceStore';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function CheckinPage() {
    const { user } = useAuth();
    const { checkinMember } = useAttendanceStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const code = useParams().checkincode;
    const eventid = useParams().eventid;

    useEffect(() => {
        const handleCheckin = async () => {
            if (!code) return;
            
            setLoading(true);
            const result = await checkinMember(code, user.member_id, eventid);
            if (result === "success") {
                
                setSuccess(true);
                // Redirect to events page after successful checkin
                setTimeout(() => {
                    navigate('/events');
                }, 2000);
            } else if (result === "already_checked_in") {
                setError('Already checked in for this event.');
            }else if (result === "invalid_code"){
                setError('Invalid check-in code. Please try again.');
            } else  {
                setError('There was an error during check-in. Please try again.');
            }
            setLoading(false);
        };

        handleCheckin();
    }, [code, checkinMember, navigate]);

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-base-100 rounded-lg shadow-xl p-8 text-center">
                {loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                        <p className="text-lg">Checking you in...</p>
                    </div>
                ) : success ? (
                    <div className="space-y-4">
                        <div className="text-success text-5xl">✓</div>
                        <h1 className="text-2xl font-bold text-success">Successfully Checked In!</h1>
                        <p className="text-gray-500">Redirecting to events page...</p>
                    </div>
                ) : error ? (
                    <div className="space-y-4">
                        <div className="text-error text-5xl">✗</div>
                        <h1 className="text-2xl font-bold text-error">Check-in Failed</h1>
                        <p className="text-gray-500">{error}</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/events')}
                        >
                            Return to Events
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                        <p className="text-lg">Initializing check-in...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckinPage;