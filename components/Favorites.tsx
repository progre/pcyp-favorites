import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import Favorite from './Favorite';

interface Props {
  favorites: readonly Favorite[];
}

export default function Favorites(props: Props): JSX.Element {
  return (
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
  );
}
