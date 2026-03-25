import { useState } from "react";
import CandidateCard from "./CandidateCard";
import './CandidatesContainer.css'
import EventCard from "../EventCard/EventCard";
import { useLocation } from "react-router-dom";

function CandidatesContainer(){
    const location=useLocation();
    const eventName=location.state?.eventName;

    const[candidate,setCandidate]=useState([
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Rahul Sharma",
    manifesto: "Improve campus facilities and student engagement.",
    position: "President",
    department: "Computer Science",
    year: "3rd Year",
    contact: "rahulsharma@gmail.com"
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Anjali Verma",
    manifesto: "Focus on cultural events and student activities.",
    position: "Vice President",
    department: "Electronics",
    year: "2nd Year",
    contact: "anjaliverma@gmail.com"
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Rohit Singh",
    manifesto: "Enhance sports facilities.",
    position: "Sports Secretary",
    department: "Mechanical",
    year: "4th Year",
    contact: "rohit@gmail.com"
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Priya Patel",
    manifesto: "Improve academic resources.",
    position: "Academic Head",
    department: "IT",
    year: "3rd Year",
    contact: "priya@gmail.com"
  },
  {
    id: 5,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Amit Kumar",
    manifesto: "Better student communication.",
    position: "General Secretary",
    department: "Civil",
    year: "2nd Year",
    contact: "amit@gmail.com"
  }
    ])

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