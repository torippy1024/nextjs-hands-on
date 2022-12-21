import {SpotifyTrackType} from '../tracks';

export interface SpotifyPlaylistType {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyPlaylistExternalUrlsType;
  followers: SpotifyPlaylistFollowersType;
  href: string;
  id: string;
  images: SpotifyPlaylistImageType[];
  name: string;
  owner: SpotifyPlaylistOwnerType;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyPlaylistTracksType;
  type: string;
  uri: string;
}

export interface SpotifyPlaylistExternalUrlsType {
  spotify: string;
}

export interface SpotifyPlaylistFollowersType {
  href: string;
  total: number;
}

export interface SpotifyPlaylistImageType {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyPlaylistOwnerType {
  external_urls: SpotifyPlaylistExternalUrlsType;
  followers: SpotifyPlaylistFollowersType;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface SpotifyPlaylistTracksType {
  href: string;
  items: SpotifyPlaylistItemType[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface SpotifyPlaylistItemType {
  added_at: Date;
  added_by: SpotifyPlaylistOwnerType;
  is_local: boolean;
  primary_color: null;
  track: SpotifyTrackType;
}
