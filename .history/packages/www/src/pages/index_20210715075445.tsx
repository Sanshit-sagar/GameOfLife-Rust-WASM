import { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { Profiler } from "react";
import "twin.macro";
import { Page } from "../layouts/Page";

const DynamicLife = dynamic(() => import("../components/Life"));

function onRenderCallback(
  id, 
  phase, 
  actualDuration, 
  baseDuration,
  startTime, 
  commitTime, 
  interactions 
) {
  console.log(`ID: ${id}, Phase: ${phase}, Duration: ${actualDuration}, Base Duration: ${baseDuration}, Start Time: ${startTime}, Commit Time: ${commitTime}, interactions: ${interactions}`); 
}

const Home: NextPage = () => {
  return (
    <Page>
      <Profiler id="DynamicLife" onRender={onRenderCallback}>
        <DynamicLife />
      </Profiler>
    </Page>
  );
};

export default Home;
