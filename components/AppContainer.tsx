import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { WithSnackbarProps, SnackbarProvider, withSnackbar } from 'notistack';
import App from './App';
import Favorite from './Favorite';
import fromPcypLiteIni from './fromPcypLiteIni';

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
      onClickGet={(pcypFavs) => {
        const blob = new Blob([pcypFavs.toFile(state.favorites)], {
          type:
            pcypFavs.fileName == null
              ? undefined
              : `application/${pcypFavs.fileName.match(/\.(.+?)$/)![1]}`,
        });
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
