import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Container } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import Favorite from './Favorite';

import styles from './App.module.css';

export interface Props {
  favorites: readonly Favorite[];
  onDropFile(file: File): void;
  onClickGetByPeCaRecorder(): string;
}

function Header(props: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.description}>
        <Typography>
          pcypLite のお気に入りを PeCaRecorder のフィルタ設定に変換します。
        </Typography>
        <ol>
          <li>
            pcypLite のインストールフォルダにある Favorite.ini
            をドラッグアンドドロップする
          </li>
          <li>変換ボタンをクリックする</li>
        </ol>
      </div>
      <div>
        <Button
          disabled={props.favorites.length === 0}
          variant="contained"
          color="primary"
          startIcon={<GetApp />}
          href="#"
          download="Filter.xml"
          onClick={(ev) => {
            (ev.currentTarget as HTMLAnchorElement).href = props.onClickGetByPeCaRecorder();
          }}
        >
          変換
        </Button>
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
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">フィルタ名</TableCell>
                  <TableCell>検索文字列</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.favorites.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row" align="right">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.regExp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
}
