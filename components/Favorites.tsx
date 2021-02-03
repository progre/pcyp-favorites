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
import Epcyp from './epcyp/Epcyp';
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

export const hiddenEpcyp = true;

export default function Favorites(props: Props): JSX.Element {
  const epcyp = new Epcyp();
  const peCaRecorder = new PeCaRecorder();
  const favs = props.favorites.map((fav) => ({
    fav,
    warnsForEpcyp: epcyp.warnsPerFavorite(fav),
    warnsForPeCaRecorder: peCaRecorder.warnsPerFavorite(fav),
  }));
  const epcypGlobalWarns = epcyp.globalWarns(props.favorites);
  const peCaRecorderGlobalWarns = peCaRecorder.globalWarns(props.favorites);

  const numErrorsEpcyp =
    favs
      .map((x) => x.warnsForEpcyp)
      .filter((x) => x.length > 0)
      .flat().length + epcypGlobalWarns.length;
  const numErrorsPeCaRecorder =
    favs
      .map((x) => x.warnsForPeCaRecorder)
      .filter((x) => x.length > 0)
      .flat().length + peCaRecorderGlobalWarns.length;
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
            {hiddenEpcyp ? null : (
              <TableCell align="center">
                <b>EPCYP</b>
                {numErrorsEpcyp > 0 ? (
                  <small> (警告 {numErrorsEpcyp} 件)</small>
                ) : (
                  ''
                )}
              </TableCell>
            )}
            <TableCell align="center">
              <b>PeCaRecorder</b>
              {numErrorsPeCaRecorder > 0 ? (
                <small> (警告 {numErrorsPeCaRecorder} 件)</small>
              ) : (
                ''
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            {hiddenEpcyp ? null : (
              <TableCell>
                <List dense={true}>
                  {epcyp.globalInfos(props.favorites).map((x, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <Info color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={x} />
                    </ListItem>
                  ))}
                  {epcypGlobalWarns.map((x, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <Warning color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={x} />
                    </ListItem>
                  ))}
                </List>
              </TableCell>
            )}
            <TableCell>
              <List dense={true}>
                {peCaRecorder.globalInfos(props.favorites).map((x, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <Info color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={x} />
                  </ListItem>
                ))}
                {peCaRecorderGlobalWarns.map((x, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <Warning color="secondary" />
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
              {hiddenEpcyp ? null : (
                <TableCell>
                  <Remarks warns={row.warnsForEpcyp} />
                </TableCell>
              )}
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
