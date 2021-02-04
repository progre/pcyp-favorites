import Favorite from '../Favorite';
import IPcypFavorites from '../IPcypFavorites';

function splitColor(rrggbb: string) {
  return {
    r: parseInt(rrggbb.slice(0, 2), 16),
    g: parseInt(rrggbb.slice(2, 4), 16),
    b: parseInt(rrggbb.slice(4, 6), 16),
  };
}

export default class PeerCastStation implements IPcypFavorites {
  readonly name = 'PeerCastStation';
  readonly hidden = true;
  readonly fileName = 'temp.json';

  globalInfos(favs: readonly Favorite[]): readonly string[] {
    return [];
  }
  globalWarns(favs: readonly Favorite[]): readonly string[] {
    return [];
  }
  warnsPerFavorite(fav: Favorite): readonly string[] {
    return [];
  }
  toFile(favs: readonly Favorite[]): string {
    return JSON.stringify({
      filters: favs.map((x) => {
        let color;
        if (x.backgroundColor == null) {
          color = 'default';
        } else {
          const colorBaseStr = x.backgroundColor.toString(16).padStart(6, '0');
          const { r, g, b } = splitColor(colorBaseStr);
          color = [
            ['default', 'f9f9f9'],
            ['blue', 'c4e3f3'],
            ['green', 'dff0d8'],
            ['red', 'f2dede'],
            ['orange', 'fcf8e3'],
          ]
            .map(([name, colorStr]) => ({ name, color: splitColor(colorStr) }))
            .map(({ name, color }) => ({
              name,
              diff:
                Math.abs(r - color.r) +
                Math.abs(g - color.g) +
                Math.abs(b - color.b),
            }))
            .reduce((p, c) => (p.diff <= c.diff ? p : c)).name;
        }
        return {
          type: 'filter',
          name: x.name,
          pattern: x.regExp,
          tags: '',
          color: color,
        };
      }),
    })
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  }
}
