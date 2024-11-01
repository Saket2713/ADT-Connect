import { CallingState, useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

const EndCallButton = () => {

    const call = useCall();
    const router = useRouter();
    

    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id

    if(!isMeetingOwner) return null;

    return (
    <Button onClick={async ()=>{await call.endCall();
        router.push('/')
    }} className='bg-red-500 rounded-2xl'>
        End entire meeting
    </Button>
  )
}

export default EndCallButton