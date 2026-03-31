import './VotingEvents.css'
import { useEffect,useState } from 'react';
import EventCard from '../EventCard/EventCard';
import api from '../../utils/axiosInterceptor';



function VotingEvents() {
    const [event, setEvent] = useState([])

const accesstoken=localStorage.getItem('accessToken');

    useEffect(()=>{
        const eventsList=async()=>{
            const response=api.get('http://localhost:5000/vote/voteevents',{
                headers:{
                    Authorization:`Bearer ${accesstoken}`
                }
            })
            const result=response.data;

            if(response.data.success){
                setEvent([{
                    id:result._id,
                    eventName:result.name,
                    eventStatus:result.status,
                    endDate:result.enddate
                }])
            }

        }


    })

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
                        EndDate={items.endDate}
                        />
                ))  
                ):(
                    <h1> No voting event started</h1>
                 )}
            </div>

        </div>
    )
}
export default VotingEvents;