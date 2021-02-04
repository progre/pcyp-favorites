import { Button, Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { GetApp, Publish } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import styles from './App.module.css';
import Epcyp from './epcyp/Epcyp';
import Favorite from './Favorite';
import Favorites from './Favorites';
import IPcypFavorites from './IPcypFavorites';
import PeCaRecorder from './pecarecorder/PeCaRecorder';
import PeerCastStation from './peercaststation/PeerCastStation';

export interface Props {
  favorites: readonly Favorite[];
  onDropFile(file: File): void;
  onClickGet(pcypFavs: IPcypFavorites): string;
}

function Header(props: Props): JSX.Element {
  return (
    <div className={styles.header}>
      <div className={styles.description}>
        <Typography>
          pcypLite のお気に入り設定を PeCaRecorder のフィルタ設定に変換します。
        </Typography>
        <ol>
          <li>
            pcypLite のインストールフォルダにある Favorite.ini
            をドラッグアンドドロップする
          </li>
          <li>変換ボタンをクリックする</li>
        </ol>
      </div>
      <div className={styles.buttons}>
        {[new Epcyp(), new PeerCastStation(), new PeCaRecorder()].map((x) =>
          x.hidden ? null : (
            <Button
              disabled={props.favorites.length === 0}
              variant="contained"
              size="large"
              color="primary"
              startIcon={<GetApp />}
              href="#"
              download={x.fileName}
              onClick={(ev) => {
                (ev.currentTarget as HTMLAnchorElement).href = props.onClickGet(
                  x
                );
              }}
            >
              {x.name} 形式へ変換
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default function App(props: Props): JSX.Element {
  return (
    <Container className={styles.root}>
      <div className={styles.container}>
        <Header {...props} />
        <div
          className={`${styles.content} ${styles.dropzoneAreaContent}`}
          hidden={props.favorites.length > 0}
        >
          <DropzoneArea
            Icon={Publish as any}
            filesLimit={1}
            showPreviewsInDropzone={false}
            showAlerts={['error', 'info']}
            onChange={(newFiles) => {
              if (newFiles.length === 0) {
                return;
              }
              props.onDropFile(newFiles[0]);
            }}
          />
        </div>
        <div className={styles.content} hidden={props.favorites.length === 0}>
          <Favorites favorites={props.favorites} />
        </div>
      </div>
    </Container>
  );
}
