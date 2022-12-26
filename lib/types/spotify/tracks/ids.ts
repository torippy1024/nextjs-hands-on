import SpotifyTrackType from '.';

export default interface SpotifyTracksType {
  items: SpotifyTrackType[];
  href?: string;
  limit?: number;
  next?: string | null;
  offset?: number;
  previous?: string | null;
  total?: number;
}
