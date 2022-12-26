import SpotifyPlaylistType from '.';

export default interface SpotifyPlaylistsType {
  items: SpotifyPlaylistType[];
  href?: string;
  limit?: number;
  next?: string | null;
  offset?: number;
  previous?: string | null;
  total?: number;
}
