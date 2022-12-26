import SpotifyPlaylistsType from '../playlists/ids';
import SpotifyTracksType from '../tracks/ids';

export default interface SpotifyMixType {
  tracks?: SpotifyTracksType;
  playlists?: SpotifyPlaylistsType;
}
