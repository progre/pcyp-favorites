import Favorite from './Favorite';

export default interface IPcypFavorites {
  readonly fileName: string;
  globalInfos(favs: readonly Favorite[]): readonly string[];
  globalWarns(favs: readonly Favorite[]): readonly string[];
  warnsPerFavorite(fav: Favorite): readonly string[];
  toFile(favs: readonly Favorite[]): string;
}
