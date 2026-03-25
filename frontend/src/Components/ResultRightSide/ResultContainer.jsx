import ResultCard from "./ResultCard";
import './ResultContainer.css'

function ResultContainer() {

  
  return (
    <div className="pageLayout">
        <h1>Results</h1>
      <div className="resultContainer">
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </div>
    </div>
  );
}

export default ResultContainer;