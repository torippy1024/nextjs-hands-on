export default interface SpotifyMePlaylistsType {
  items: SpotifyMePlaylistsItemType[];
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyMePlaylistsItemType {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyMePlaylistsExternalUrlsType;
  href: string;
  id: string;
  images: SpotifyMePlaylistsImageType[];
  name: string;
  owner: SpotifyMePlaylistsOwnerType;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyMePlaylistsTracksType;
  type: string;
  uri: string;
}

export interface SpotifyMePlaylistsExternalUrlsType {
  spotify: string;
}

export interface SpotifyMePlaylistsImageType {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyMePlaylistsOwnerType {
  external_urls: SpotifyMePlaylistsExternalUrlsType;
  followers?: SpotifyMePlaylistsTracksType;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name?: string;
}

export interface SpotifyMePlaylistsTracksType {
  href: string;
  total: number;
}
