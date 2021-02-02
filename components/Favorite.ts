export default interface Favorite {
  readonly name: string;
  readonly regExp: string;
  readonly searchTarget: Readonly<{
    channelName: boolean;
    genre: boolean; // pcypLite は genre/desc/playing をまとめる
    description: boolean;
    trackTitle: boolean;
    comment: boolean;
    contactUrl: boolean;
    ypName: boolean;
    type: boolean;
    streamUrl: boolean; // pcypLite
    // id: boolean; // PeCaRecorder
    // tip: boolean; // PeCaRecorder
    listeners: boolean; // pcypLite
    bitrate: boolean; // pcypLite
  }>;
  readonly enable: boolean;
  readonly type: 'tag' | 'favorite' | 'ignore';
  readonly notification: boolean;
  readonly useRegex: boolean; // pcypLite
  readonly ignoreFullwidthAndHalfwidth: boolean; // 全半角を区別しない
  readonly ignoreCase: boolean; // 大文字小文字を区別しない
}
