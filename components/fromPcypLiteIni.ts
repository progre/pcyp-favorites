import ini from 'ini';
import Favorite from './Favorite';

function toFavorite(
  title: string,
  word: string,
  flags: number,
  color: number,
  colorText: number
): Favorite {
  const enable = (flags & (1 << 0)) !== 0;
  const channelName = (flags & (1 << 1)) !== 0;
  const genreDescPlaying = (flags & (1 << 2)) !== 0; // ジャンル詳細プレイ
  const comment = (flags & (1 << 3)) !== 0;
  const contactUrl = (flags & (1 << 4)) !== 0;
  const ypName = (flags & (1 << 5)) !== 0;
  const type = (flags & (1 << 6)) !== 0;
  const streamUrl = (flags & (1 << 7)) !== 0; // 代わりにIDへ。要警告
  const listeners = (flags & (1 << 8)) !== 0; // 無理。要警告
  const bitrate = (flags & (1 << 9)) !== 0; // 無理。要警告
  const ignore = (flags & (1 << 10)) !== 0; // 無視機能
  const disableNotification = (flags & (1 << 11)) !== 0; // 通知しない → 新着時に通知する
  const showInFavoriteList = (flags & (1 << 12)) !== 0; // お気に入りフィルタに追加する
  const useRegex = (flags & (1 << 13)) !== 0; // 常に有効。要警告
  const ignoreFullwidthAndHalfwidth = (flags & (1 << 14)) !== 0; // 全半角一致 全角半角の違いを無視して一致扱いする
  const backgroundColor = (flags & (1 << 15)) !== 0 ? color : null;
  const textColor = (flags & (1 << 16)) !== 0 ? colorText : null;
  // 大小文字は区別しない 固定
  return new Favorite(
    title,
    word,
    {
      channelName,
      genre: genreDescPlaying,
      description: genreDescPlaying,
      trackTitle: genreDescPlaying,
      comment,
      contactUrl,
      ypName,
      type,
      streamUrl,
      listeners,
      bitrate,
    },
    enable,
    ignore ? 'ignore' : showInFavoriteList ? 'favorite' : 'tag',
    !disableNotification,
    useRegex,
    ignoreFullwidthAndHalfwidth,
    true,
    textColor,
    backgroundColor
  );
}

export default function fromPcypLiteIni(text: string): Favorite[] | null {
  const favorites = ini.parse(text);
  const keys = Object.keys(favorites);
  if (keys[0] !== 'Fav_0') {
    return null;
  }
  return keys
    .map((x) => favorites[x])
    .map((x) =>
      toFavorite(x.Title, x.Word, x.Flags, Number(x.Color), Number(x.ColorText))
    );
}
