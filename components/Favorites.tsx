import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Info, Warning } from '@material-ui/icons';
import React from 'react';
import Favorite from './Favorite';
import PeCaRecorder from './pecarecorder/PeCaRecorder';

interface Props {
  favorites: readonly Favorite[];
}

function Remarks(props: { warns: readonly string[] }): JSX.Element {
  return (
    <List dense={true}>
      {props.warns.map((x, i) => (
        <ListItem key={i}>
          <ListItemIcon>
            <Warning color="secondary" />
          </ListItemIcon>
          <ListItemText primary={x} />
        </ListItem>
      ))}
    </List>
  );
}

export default function Favorites(props: Props): JSX.Element {
  const pcypFavs = new PeCaRecorder();
  const favs = props.favorites.map((fav) => ({
    fav,
    warnsForPeCaRecorder: pcypFavs.warnsPerFavorite(fav),
  }));
  const numErrors = favs
    .map((x) => x.warnsForPeCaRecorder)
    .filter((x) => x.length > 0)
    .flat().length;
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <b>フィルタ名</b>
            </TableCell>
            <TableCell>
              <b>検索文字列</b>
            </TableCell>
            <TableCell align="center">
              <b>備考</b>
              {numErrors > 0 ? <small> (警告 {numErrors} 件)</small> : ''}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <List dense={true}>
                {pcypFavs.globalInfos(props.favorites).map((x, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={x} />
                  </ListItem>
                ))}
              </List>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favs.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row" align="right">
                {row.fav.name}
              </TableCell>
              <TableCell>
                <small>{row.fav.regExp}</small>
              </TableCell>
              <TableCell>
                <Remarks warns={row.warnsForPeCaRecorder} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
