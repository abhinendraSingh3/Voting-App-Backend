import { useState, useEffect } from "react";
import CandidateCard from "./CandidateCard";
import './CandidatesContainer.css'
import EventCard from "../EventCard/EventCard";
import { useLocation } from "react-router-dom";
import api from '../../utils/axiosInterceptor';

function CandidatesContainer() {
  const accesstoken = localStorage.getItem('token');
  const location = useLocation();
  // const eventName=location.state?.eventName;
  const { eventName, electionId } = location.state || {};


  const [candidate, setCandidate] = useState([])

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get(`/votingEvents/allcandidates/${electionId}`, {
          headers: {
            Authorization: `Bearer ${accesstoken}`
          }
        });

        const result = response.data;



        if (result.success) {
          const candiData = result.data;

          setCandidate(candiData.map((item)=>({
            id: item._id,
            name: item.candidateName,
            manifesto: item.manifesto,
            position: item.position,
            department: item.department,
            year: item.candidateYear
            // contact: 
          })))

        }

      }
      catch (error) {
        console.log("error occured at voteNow -->", error)
      }
    }
    fetchCandidates();

  }, [electionId])


  return (
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
          {candidate.map((person) => (
            <CandidateCard
              electionId={person.electionId}
              candidateId={person.id}
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