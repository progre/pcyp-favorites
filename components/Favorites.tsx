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
import PeerCastStation from './peercaststation/PeerCastStation';

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
  const pcypList = [new Epcyp(), new PeerCastStation(), new PeCaRecorder()];

  const favs = props.favorites.map((fav) => ({
    fav,
    warnsList: pcypList.map((x) => x.warnsPerFavorite(fav)),
  }));
  const globalWarnsList = pcypList.map((x) => x.globalWarns(props.favorites));

  const numErrorsList = pcypList.map(
    (_, pcypIdx) =>
      favs
        .map((x) => x.warnsList[pcypIdx])
        .filter((x) => x.length > 0)
        .flat().length + globalWarnsList[pcypIdx].length
  );
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
            {pcypList.map((x, pcypIdx) =>
              x.hidden ? null : (
                <TableCell key={x.name} align="center">
                  <b>{x.name}</b>
                  {numErrorsList[pcypIdx] > 0 ? (
                    <small> (警告 {numErrorsList[pcypIdx]} 件)</small>
                  ) : (
                    ''
                  )}
                </TableCell>
              )
            )}
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            {pcypList.map((pcyp, pcypIdx) =>
              pcyp.hidden ? null : (
                <TableCell key={pcyp.name}>
                  <List dense={true}>
                    {pcyp.globalInfos(props.favorites).map((x, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <Info color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={x} />
                      </ListItem>
                    ))}
                    {globalWarnsList[pcypIdx].map((x, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <Warning color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={x} />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              )
            )}
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
              {pcypList.map((x, pcypIdx) =>
                x.hidden ? null : (
                  <TableCell>
                    <Remarks warns={row.warnsList[pcypIdx]} />
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
