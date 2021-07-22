import { AppProps } from "next/app";
import React from "react";
import { GlobalStyles } from "../styles/GlobalStyles";
import { TwinGlobalStyles } from "../styles/TwinGlobalStyles";
import { Toaster } from 'react-hot-toast';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <TwinGlobalStyles />
      <GlobalStyles />
      <Toaster
        position="bottom-left"
        reverseOrder={true}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
