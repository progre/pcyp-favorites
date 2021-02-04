import Favorite from './Favorite';

export default interface IPcypFavorites {
  readonly name: string;
  readonly hidden: boolean;
  readonly fileName: string | null;
  globalInfos(favs: readonly Favorite[]): readonly string[];
  globalWarns(favs: readonly Favorite[]): readonly string[];
  warnsPerFavorite(fav: Favorite): readonly string[];
  toFile(favs: readonly Favorite[]): string;
}
