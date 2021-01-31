import ini from 'ini';
import React, { useState } from 'react';
import App from './App';
import Favorite from './Favorite';
import toPeCaRecorderXml from './toPeCaRecorderXml';
import { WithSnackbarProps, SnackbarProvider, withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';

function fromPcypLiteIni(text: string): Favorite[] | null {
  const favorites = ini.parse(text);
  const keys = Object.keys(favorites);
  if (keys[0] !== 'Fav_0') {
    return null;
  }
  return keys
    .map((x) => favorites[x])
    .map((x) => {
      const favorite: Favorite = { name: x.Title, regExp: x.Word };
      return favorite;
    });
}

function AppContainerWrapped(props: WithSnackbarProps): JSX.Element {
  const [state, setState] = useState({ favorites: [] as readonly Favorite[] });

  return (
    <App
      favorites={state.favorites}
      onDropFile={async (file) => {
        const text = await file.text();
        const favorites = fromPcypLiteIni(text);
        if (favorites == null) {
          props.enqueueSnackbar('ファイルのパースに失敗しました。', {
            variant: 'error',
            action: (key) => (
              <Button onClick={() => props.closeSnackbar(key)}>Dismiss</Button>
            ),
          });
          return;
        }
        setState((old) => ({ ...old, favorites }));
      }}
      onClickGetByPeCaRecorder={() => {
        const blob = new Blob([toPeCaRecorderXml(state.favorites)], {
          type: 'application/xml',
        });
        blob.text().then(console.log);
        return URL.createObjectURL(blob);
      }}
    />
  );
}

const AppContainerWrapper = withSnackbar(AppContainerWrapped);

export default function AppContainer(): JSX.Element {
  return (
    <SnackbarProvider>
      <AppContainerWrapper />
    </SnackbarProvider>
  );
}
