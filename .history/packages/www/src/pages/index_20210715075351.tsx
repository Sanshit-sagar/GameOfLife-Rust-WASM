import { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { Profiler } from "react";
import "twin.macro";
import { Page } from "../layouts/Page";

const DynamicLife = dynamic(() => import("../components/Life"));

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  console.log(`ID: ${id}, Phase: ${phase}, Duration: ${actualDuration}, Base Duration: ${baseDuration}, Start Time: ${startTime}, Commit Time: ${commitTime}, interactions: ${interactions}`); 
}

const Home: NextPage = () => {
  return (
    <Page>
      <Profiler id="DynamicLife" callback={onRenderCallback}>
        <DynamicLife />
      </Profiler>
    </Page>
  );
};

export default Home;
