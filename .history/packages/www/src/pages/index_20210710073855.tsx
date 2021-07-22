import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import "twin.macro";
import { Page } from "../layouts/Page";

const DynamicLife = dynamic(() => import("../components/Life"));

const Home: NextPage = () => {
  return (
    <Page>
      <h1> Game of Life </h1>
      <DynamicLife />
    </Page>
  );
};

export default Home;
