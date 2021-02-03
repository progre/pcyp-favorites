import Favorite from '../Favorite';
import IPcypFavorites from '../IPcypFavorites';
import toPeCaRecorderXml from './toPeCaRecorderXml';

export default class PeCaRecorder implements IPcypFavorites {
  readonly fileName = 'Filter.xml';

  globalInfos(favs: readonly Favorite[]): readonly string[] {
    return [
      favs.filter((x) => x.type === 'favorite').length <= 10
        ? 'お気に入りの数が10件以下なので、それぞれの "お気に入りリストにタブを表示" は ON になります。'
        : 'お気に入りの数が10件を超しているので、それぞれの "お気に入りリストにタブを表示" は OFF になります。',
    ];
  }

  warnsPerFavorite(fav: Favorite): readonly string[] {
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

  toFile(favs: readonly Favorite[]): string {
    return toPeCaRecorderXml(favs);
  }
}
