import React from "react"
import useFps from "../hooks/useFps"

interface HistoryProps {
    length?: number | string;
}

const FpsHistory: React.FC<HistoryProps> = ({ length = 100 }) => {
    const {fps, avgFps, maxFps, currentFps} = useFps(length);
    
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
  