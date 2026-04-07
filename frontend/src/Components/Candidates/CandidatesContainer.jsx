import { useState,useEffect } from "react";
import CandidateCard from "./CandidateCard";
import './CandidatesContainer.css'
import EventCard from "../EventCard/EventCard";
import { useLocation } from "react-router-dom";
import api from '../../utils/axiosInterceptor';

function CandidatesContainer(){
    const location=useLocation();
    // const eventName=location.state?.eventName;
    const {eventName,electionId}=location.state || {};

    const[candidate,setCandidate]=useState([])
    useEffect(async()=>{
      const response=await api.get('/votingEvents/allcandidates',{
        params:{
          electionId:
        },
        headers:{
          Authorization:`Bearer ${accesstoken}`
        }

      });

    })

    return(
        <div className="main-cont">
            <div className="heading">
                <h1>Voting Event</h1>
            </div>
            <div className="subContainer">
                <div className="eventName-container">
                    <h2>{eventName}</h2>
                </div>
                <div className="choose-container">
                    <h3>Choose Your Candidate</h3>
                </div>
                <div className="candidate-card">
                    {candidate.map((person)=>(
                        <CandidateCard
                        key={person.id}
                        pImg={person.image}
                        pName={person.name}
                        pManifesto={person.manifesto}
                        pPosition={person.position}
                        pDepartment={person.department}
                        pYear={person.year}
                        pContact={person.contact}
                        />
                    ))}
                </div>
                
            </div>

        </div>

    )
}
export default CandidatesContainer;