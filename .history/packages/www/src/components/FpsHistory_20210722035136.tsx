import React from "react"
import useFps from "../hooks/useFps"

interface HistoryProps {
    numElements?: number;
}

const FpsHistory: React.FC<HistoryProps> = ({ numElements = 100 }) => {
    let numElems = numElements | 100
    const {fps, avgFps, maxFps, minFps, currentFps} = useFps(numElems);
    
    return (
      
      <div>
        <div> Currently: {currentFps} FPS </div>
        <div> Average: {avgFps} FPS </div>
        <div> Max: {maxFps} FPS </div>
        <div> Min: {minFps} FPS </div>
       
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
  