import './VotingEvents.css'
import { useState } from 'react';
import EventCard from '../EventCard/EventCard';

function VotingEvents() {
    const [event, setEvent] = useState([
        //sample data later from backend
        {
            id: 1,
            name: 'Student Council Election',
            status: 'Active',
            date: 'March 19, 2024'
        },
        {
            id: 2,
            name: 'Cultural Club Leadership Election',
            status: 'Closed',
            date: 'Apr 10, 2024'
        },
        {
            id: 3,
            name: 'Sports Committee Selection',
            status: 'Active',
            date: 'March 25, 2024'
        },
        {
            id: 4,
            name: 'Academic Council Voting',
            status: 'Pending',
            date: 'April 5, 2024'
        },
        {
            id: 5,
            name: 'Drama Council Voting',
            status: 'Result Out',
            date: 'April 5, 2024'
        }
    ])

    return (
        <div className="main-body">
            <div className='voting_head'>
                <h1>Voting Events</h1>
            </div>
            <div className='cards-body'>
                {event.length>0?(
                    event.map((items)=>(
                        <EventCard
                        key={items.id}
                        eventName={items.name}
                        eventStatus={items.status}
                        eventDate={items.date}
                        />
                ))  
                ):(
                    <h1> No voting even</h1>
                 )}
            </div>

        </div>
    )
}
export default VotingEvents;