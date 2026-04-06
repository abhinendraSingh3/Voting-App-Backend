import './VotingEvents.css'
import { useEffect, useState } from 'react';
import EventCard from '../EventCard/EventCard';
import api from '../../utils/axiosInterceptor';


function VotingEvents() {
    const [event, setEvent] = useState([])

    const accesstoken = localStorage.getItem('accessToken');

    useEffect(() => {

        const eventsList = async () => {
            try {
                const response = await api.get('/vote/voteevents', {
                    headers: {
                        Authorization: `Bearer ${accesstoken}`
                    }
                })
                const result = response.data;
                console.log(result)
                if (response.data.success) {
                    console.log(result.data.Ar)
                    setEvent(result.data.map(events => ({
                        id: events._id,
                        eventName: events.name,
                        eventStatus: events.status,
                        endDate: events.enddate
                    })));
                }
            }
            catch (error) {
                console.log("Error fetching events:", error);
            }

        }
        eventsList();
        


    }, [accesstoken])

    return (
        <div className="main-body">
            <div className='voting_head'>
                <h1>Voting Events</h1>
            </div>
            <div className='cards-body'>
                {event.length > 0 ? (
                    event.map((items) => (
                        <EventCard
                            key={items.id}
                            eventName={items.eventName}
                            eventStatus={items.eventStatus}
                            EndDate={items.endDate}
                        />
                    ))
                ) : (
                    <h1> No voting event started</h1>
                )}
            </div>

        </div>
    )
}
export default VotingEvents;