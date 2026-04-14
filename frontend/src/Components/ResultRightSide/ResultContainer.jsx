import ResultCard from "./ResultCard";
import './ResultContainer.css'
import api from '../../utils/axiosInterceptor'
import { useEffect,useState } from "react";
import CandidateCard from "../Candidates/CandidateCard";

function ResultContainer() {

  const[closedResult,setClosedResult]=useState([]);

  const accessToken = localStorage.getItem('token')

  useEffect(() => {
    const resultData = async () => {
      try {
        const res = await api.get('/result/viewResult', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        const result = res.data;
        // console.log(result)
        if (result.success) {

          const retriveInfo=result.data;
          setClosedResult(retriveInfo.map((i)=>({
            id:i._id,
            eventName:i.name
          })))
        }

      }
      catch (error) {
        console.log("loge lg gye at resultContainer---> ", error)
      }
    }
    resultData();
  }, [accessToken])


  return (
    <div className="pageLayout">
      <h1>Results</h1>
      <div className="resultContainer">
        {closedResult.map((item)=>(
          <ResultCard 
          key={item.id}
          eventId={item.id}
          eventName={item.eventName}
          />
        ))}
      </div>
    </div>
  );
}

export default ResultContainer;