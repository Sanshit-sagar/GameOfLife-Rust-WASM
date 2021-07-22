import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import "twin.macro";
import { Page } from "../layouts/Page";
import Fps from '../components/Fps';

const DynamicLife = dynamic(() => import("../components/Life"));

const Home: NextPage = () => {
  return (
    <Page>
      {/* <DynamicLife /> */}
      <Fps />
    </Page>
  );
};

export default Home;
