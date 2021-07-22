import React from "react"
import useFps from "../hooks/useFps"
import useStyles from "../hooks/useStyles"

interface ComponentProps {
  width?: number;
  height?: number;
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
}

const FpsView: React.FC<ComponentProps> = ({top = 450, left = 0, bottom = 'auto', right = 'auto', width = 300, height = 125}) => {
  const {fps, avgFps, maxFps, currentFps} = useFps(100);
  const {graphStyle, barStyle, wrapperStyle} = useStyles(300, height, top, right, bottom, left, fps.length);

  return (
    // @ts-ignore
    <div style={wrapperStyle}>
      <span>{currentFps} FPS ({avgFps} Avg)</span>
      {/* @ts-ignore */}
      <div style={graphStyle}>
        {fps.map((val, i) => (
          // @ts-ignore
          <div key={i} style={barStyle((height * val) / maxFps, i)}/>
        ))}
      </div>
    </div>
  );
};

export default FpsView;
