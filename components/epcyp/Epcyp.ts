import Favorite from '../Favorite';
import IPcypFavorites from '../IPcypFavorites';
import toEpcypJson from './toEpcypJson';

export default class Epcyp implements IPcypFavorites {
  readonly fileName = 'favorites.json';

  globalInfos(favs: readonly Favorite[]): readonly string[] {
    return [];
  }

  globalWarns(favs: readonly Favorite[]): readonly string[] {
    if (favs.some((x) => x.searchTarget.genreDescPlaying)) {
      return ['"トラックタイトル" は検索対象にできません。'];
    }
    return [];
  }

  warnsPerFavorite(fav: Favorite): readonly string[] {
    return ([
      [fav.searchTarget.ypName, '"YP名" は検索対象にできません。'],
      [fav.searchTarget.type, '"TYPE" は検索対象にできません。'],
      [
        fav.searchTarget.streamUrl,
        '"ストリームURL" は検索対象にできません。代わりに "IP" を検索対象にします。',
      ],
      [fav.searchTarget.listeners, '"リスナー数" は検索対象にできません。'],
      [fav.searchTarget.bitrate, '"ビットレート" は検索対象にできません。'],
      [
        !fav.enable,
        '設定を無効状態にすることはできません。有効状態にして取り込みます。',
      ],
      [!fav.useRegex, '正規表現は常に有効になります。'],
      [fav.ignoreFullwidthAndHalfwidth, '全角半角を区別することはできません。'],
      [!fav.ignoreCase, '大文字小文字は常に無視されます。'],
    ] as readonly [boolean, string][])
      .filter(([check, _]) => check)
      .map(([_, msg]) => msg);
  }

  toFile(favs: readonly Favorite[]): string {
    return toEpcypJson(favs);
  }
}
