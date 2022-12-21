export interface SpotifyMePlaylistsType {
  items: SpotifyMePlaylistsItemType[];
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface SpotifyMePlaylistsItemType {
  collaborative: boolean;
  description: string;
  externalUrls: SpotifyMePlaylistsExternalUrlsType;
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
  height: number;
  width: number;
}

export interface SpotifyMePlaylistsOwnerType {
  externalUrls: SpotifyMePlaylistsExternalUrlsType;
  followers: SpotifyMePlaylistsTracksType;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface SpotifyMePlaylistsTracksType {
  href: string;
  total: number;
}
