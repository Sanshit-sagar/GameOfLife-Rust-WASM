import React from "react"
import useFps from "../hooks/useFps"

interface HistoryProps {
    length?: number | string;
}

const FpsHistory: React.FC<HistoryProps> = ({ numElements = 100 }) => {
    let numElems = parseInt(numElements) | 100
    const {fps, avgFps, maxFps, currentFps} = useFps(numElems);
    
    return (
      
      <div>
        <span>{currentFps} FPS ({fps} Avg)</span>
       
        <div>
          {fps.map((value, index) => (
            <div key={index}>
                <p> {index}: {value} </p> 
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FpsHistory;
  