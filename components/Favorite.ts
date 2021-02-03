export default class Favorite {
  constructor(
    readonly name: string,
    readonly regExp: string,
    readonly searchTarget: Readonly<{
      channelName: boolean;
      genreDescPlaying: boolean; // pcypLite
      // genre: boolean;
      // description: boolean;
      // trackTitle: boolean;
      comment: boolean;
      contactUrl: boolean;
      ypName: boolean;
      type: boolean;
      streamUrl: boolean; // pcypLite
      // id: boolean, // PeCaRecorder
      // tip: boolean, // PeCaRecorder
      listeners: boolean; // pcypLite
      bitrate: boolean; // pcypLite
    }>,
    readonly enable: boolean,
    readonly type: 'tag' | 'favorite' | 'ignore',
    readonly notification: boolean,
    readonly useRegex: boolean, // pcypLite
    readonly ignoreFullwidthAndHalfwidth: boolean, // 全半角を区別しない
    readonly ignoreCase: boolean, // 大文字小文字を区別しない
    readonly textColor: number | null, // pcypLite 0未満はGUIカラー
    readonly backgroundColor: number | null // pcypLite 0未満はGUIカラー
  ) {}

  regExpToNumber(): number | null {
    const m = /^\^?(\d+)\$?$/.exec(this.regExp);
    if (m == null) {
      return null;
    }
    return Number(m[1]);
  }

  searchTargetOnlyBitrateAndOrListeners() {
    return Object.keys(this.searchTarget)
      .filter((x) => !['listeners', 'bitrate'].includes(x))
      .map((x) => (this.searchTarget as { [key: string]: boolean })[x])
      .every((x) => !x);
  }
}
