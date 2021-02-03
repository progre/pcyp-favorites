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

interface Props {
  favorites: readonly Favorite[];
}

function warnsForPeCaRecorder(fav: Favorite): readonly string[] {
  return ([
    [
      fav.searchTarget.streamUrl,
      'PeCaRecorder では "ストリームURL" を検索対象にできません。代わりに "ID" "TIP" を検索対象にします。',
    ],
    [
      fav.searchTarget.listeners && fav.regExpToNumber() == null,
      'PeCaRecorder では "リスナー" を検索対象にできません。',
    ],
    [
      fav.searchTarget.bitrate && fav.regExpToNumber() == null,
      'PeCaRecorder では "ビットレート" を検索対象にできません。',
    ],
    [!fav.useRegex, 'PeCaRecorder では常に正規表現が有効になります。'],
    [
      fav.textColor != null && fav.textColor < 0,
      'PeCaRecorder では文字色に GUI に紐づいた色を使用できません。',
    ],
    [
      fav.backgroundColor != null && fav.backgroundColor < 0,
      'PeCaRecorder では背景色に GUI に紐づいた色を使用できません。',
    ],
  ] as readonly [boolean, string][])
    .filter(([check, _]) => check)
    .map(([_, msg]) => msg);
}

function Remarks(props: {
  warnsForPeCaRecorder: readonly string[];
}): JSX.Element {
  return (
    <List dense={true}>
      {props.warnsForPeCaRecorder.map((x, i) => (
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
  const favs = props.favorites.map((fav) => ({
    fav,
    warnsForPeCaRecorder: warnsForPeCaRecorder(fav),
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
                <ListItem>
                  <ListItemIcon>
                    <Info color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      favs.filter((x) => x.fav.type === 'favorite').length <= 10
                        ? 'お気に入りの数が10件以下なので、それぞれの "お気に入りリストにタブを表示" は ON になります。'
                        : 'お気に入りの数が10件を超しているので、それぞれの "お気に入りリストにタブを表示" は OFF になります。'
                    }
                  />
                </ListItem>
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
                <Remarks warnsForPeCaRecorder={row.warnsForPeCaRecorder} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
