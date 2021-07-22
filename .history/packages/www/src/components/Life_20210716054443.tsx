import { Cell, Universe } from "crate"
import { memory } from "crate/pkg/crate_bg.wasm"
import React, { useEffect, useRef, useState } from "react"
import { Play, Pause, RefreshCw } from "react-feather"
import tw from "twin.macro"
import toast from 'react-hot-toast'
import { performance } from 'perf_hooks'

const CELL_SIZE = 10; 
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

export const useFps = (windowWidth: number) => {
  const lastFpsValues = useRef<number[]>([]);
  const [fps, setFps] = useState<number[]>([]);
  const prevTime = useRef(performance.now());
  const frames = useRef(0);
  const animRef = useRef(0);

  const calcFps = () => {
    const t = performance.now();
    frames.current += 1;

    if (t > prevTime.current + 1000) {
      const elapsedTime = t - prevTime.current;
      const currentFps = (frames.current * 1000) / elapsedTime;
      lastFpsValues.current = lastFpsValues.current.concat(currentFps);
      
      if (elapsedTime > 1500) {
        for (let i = 1; i <= (elapsedTime - 1000) / 1000; i++) {
          lastFpsValues.current = lastFpsValues.current.concat(0);
        }
      }

      lastFpsValues.current = lastFpsValues.current.slice(Math.max(lastFpsValues.current.length - windowWidth, 0));
      setFps(lastFpsValues.current);
      frames.current = 0;
      prevTime.current = performance.now();
    }
    animRef.current = requestAnimationFrame(calcFps);
  };

  useEffect(() => {
    animRef.current = requestAnimationFrame(calcFps);
    return () => {
      cancelAnimationFrame(animRef.current);
    }
  }, []);

  const avgFps = (fps.reduce((a,b) => a + b, 0) / fps.length).toFixed(2);
  const maxFps = Math.max.apply(Math.max, fps);
  const minFps = Math.min.apply(Math.min, fps);
  const currentFps = fps[fps.length - 1];

  return {fps, avgFps, maxFps, minFps, currentFps};
}

const Life: React.FC = () => {
  const { fps, avgFps, maxFps, minFps, currentFps  } = useFps(100)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const universeRef = useRef(Universe.new());
  const [isPaused, setIsPaused] = useState(false);

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
      ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
      ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
  };

  const getIndex = (row: number, column: number, width: number) => {
    return row * width + column;
  };

  const drawCells = (
    ctx: CanvasRenderingContext2D,
    universe: Universe,
    width: number,
    height: number,
  ) => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col, width);

        ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE,
        );
      }
    }

    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas == null || ctx == null) return;

    const universe = universeRef.current;
    const width = universe.width();
    const height = universe.height();

    canvas.height = (CELL_SIZE + 1) * height + 1;
    canvas.width = (CELL_SIZE + 1) * width + 1;

    let animationId: number | null = null;

    const renderLoop = () => {
      if (!isPaused) {
        universe.tick();
      }

      drawGrid(ctx, width, height);
      drawCells(ctx, universe, width, height);
      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      if (animationId != null) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  const onClickCell = (x: number, y: number) => {
    toast(`clicked ${x}, ${y}`);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas == null || ctx == null) return;

    const universe = universeRef.current;
    const width = universe.width();
    const height = universe.height();

    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (x - boundingRect.left) * scaleX;
    const canvasTop = (y - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    universe.toggle_cell(row, col);

    drawGrid(ctx, width, height);
    drawCells(ctx, universe, width, height);
  };

  return (
    <div tw="leading-none inline-flex justify-between w-full h-full">
      <div tw="mb-4">
        <div tw="flex-col h-full w-full justify-start">
          <div tw="space-y-4 mb-4">
            <h1 tw="font-bold text-4xl text-black">
              Game of Life
            </h1>
          </div>

          <div tw="flex space-x-4 mt-4">
            <button
              onClick={() => {
                setIsPaused(!isPaused)
                toast.success(`${isPaused ? 'Resumed' : 'Paused'} the game`);
              }}
              css={[tw`focus:outline-none focus:ring bg-black text-white hover:bg-gray-200 hover:text-black ring-pink-500 rounded-md shadow-md px-5 py-2`]}
            >
              {isPaused ? <Play /> : <Pause />}
            </button>

            <button
              onClick={() => {
                universeRef?.current.restart();
              }}
              css={[tw`focus:outline-none focus:ring bg-black text-white hover:bg-gray-200 hover:text-black ring-pink-500 rounded-md shadow-md px-5 py-2`]}
            >
              <RefreshCw />
            </button>
          </div>
          

          <div tw="container mx-auto p-5 mt-5 rounded-md shadow-lg border border-black">
            <span className="text-md font-bold">
              Frames per Second Statistics
            </span>
            
            {/* <div>
              <div> Avg of last 100: {avgFps} </div>
              <div> Max of last 100 {maxFps} </div>
              <div> Min of last 100: {minFps} </div> 
              <div> Current FPS {currentFps} </div> 
            </div> */}
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        onClick={e => onClickCell(e.clientX, e.clientY)}
      />
    </div>
  );
};

export default Life;
