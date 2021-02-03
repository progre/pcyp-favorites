import Favorite from '../Favorite';

export default function toPeCaRecorderXml(
  favorites: readonly Favorite[]
): string {
  return JSON.stringify(
    favorites.map((x) => ({
      name: x.name,
      pattern: x.regExp,
      target: {
        name: x.searchTarget.channelName,
        genre: x.searchTarget.genreDescPlaying,
        detail: x.searchTarget.genreDescPlaying,
        comment: x.searchTarget.comment,
        url: x.searchTarget.contactUrl,
        tip: x.searchTarget.streamUrl,
      },
      fontColor: x.textColor?.toString(16).padStart(6, '0') ?? '222222',
      bgColor: x.backgroundColor?.toString(16).padStart(6, '0') ?? 'ffffff',
      isNotify: x.notification,
      isDisableColor: x.textColor == null && x.backgroundColor == null,
    }))
  );
}
