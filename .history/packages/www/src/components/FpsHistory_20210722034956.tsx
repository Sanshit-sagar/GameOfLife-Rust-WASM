import React from "react"
import useFps from "../hooks/useFps"

interface HistoryProps {
    numElements?: number;
}

const FpsHistory: React.FC<HistoryProps> = ({ numElements = 100 }) => {
    let numElems = numElements | 100
    const {fps, avgFps, maxFps, currentFps} = useFps(numElems);
    
    return (
      
      <div>
        <span> Currently: {currentFps} FPS </span>
        <span> Average: {avgFps} FPS </span>
        <span> Max: {maxFps} FPS </span>
       
        {/* <div style={{ maxHeight: '100px', height: '100px', overflowY: 'scroll' }}>
          {fps.map((value, index) => (
            <div key={index}>
                <p> {index}: {value} </p> 
            </div>
          ))}
        </div> */}
      </div>
    );
  };
  
  export default FpsHistory;
  