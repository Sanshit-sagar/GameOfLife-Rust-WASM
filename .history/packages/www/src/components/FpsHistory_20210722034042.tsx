import React from "react"
import useFps from "../hooks/useFps"


const FpsHistory: React.FC<null> = () => {
    const {fps, avgFps, maxFps, currentFps} = useFps(100);
    
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
  