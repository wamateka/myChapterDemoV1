import { User } from 'lucide-react';
import { use } from 'passport';
import React, { useState } from 'react'

function eventCheckinPage() {
    const {eventCheckin} = useEventStore();
    const [checkinStatus, setCheckinStatus] = useState(null);
    useEffect(()=> {
        async function checkin(){
            const status = await eventCheckin(checkinCode, User.member_id);
            setCheckinStatus(status);
        }
        checkin();
    } )
  return (
    <div>
        {checkinStatus === null ? 
        ( <span>Loading...</span>) :
        (checkinStatus.success ?(<p>Checked in successfully</p>) : (<p>Check-in failed. Please try again.</p>))}
    </div>
  )
}

export default eventCheckinPage
