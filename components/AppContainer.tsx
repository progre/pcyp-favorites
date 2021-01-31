import ini from 'ini';
import React, { useState } from 'react';
import App from './App';
import Favorite from './Favorite';
import toPeCaRecorderXml from './toPeCaRecorderXml';

function fromPcypLiteIni(text: string): Favorite[] {
  const favorites = ini.parse(text);
  return Object.keys(favorites)
    .map((x) => favorites[x])
    .map((x) => {
      const favorite: Favorite = { name: x.Title, regExp: x.Word };
      return favorite;
    });
}

export default function AppContainer(): JSX.Element {
  const [state, setState] = useState({ favorites: [] as readonly Favorite[] });

  return (
    <App
      favorites={state.favorites}
      onDropFile={async (file) => {
        const text = await file.text();
        setState((old) => ({ ...old, favorites: fromPcypLiteIni(text) }));
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
