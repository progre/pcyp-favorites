import { CssBaseline } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import AppContainer from '../components/AppContainer';

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Head>
        <title>pcyp-favorites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContainer />
    </>
  );
}
