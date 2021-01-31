import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Container } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import Favorite from './Favorite';

export type Props = Readonly<{
  favorites: readonly Favorite[];
  onDropFile(file: File): void;
  onClickGetByPeCaRecorder(): string;
}>;

export default function App(props: Props): JSX.Element {
  return (
    <Container>
      <div hidden={props.favorites.length > 0}>
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
      <div hidden={props.favorites.length === 0}>
        <Button
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
    </Container>
  );
}
