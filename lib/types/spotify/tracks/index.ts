export default interface SpotifyTrackType {
  album: SpotifyTrackAlbumType;
  artists: SpotifyTrackArtistType[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyTrackExternalIDSType;
  external_urls: SpotifyTrackExternalUrlsType;
  href: string;
  id: string;
  is_playable?: boolean;
  restrictions?: SpotifyTrackRestrictionsType;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface SpotifyTrackAlbumType {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyTrackExternalUrlsType;
  href: string;
  id: string;
  images: SpotifyTrackImageType[];
  name: string;
  release_date: string | null;
  release_date_precision: string | null;
  restrictions?: SpotifyTrackRestrictionsType;
  type: string;
  uri: string;
  album_group?: string;
  artists: SpotifyTrackAlbumArtistType[];
}

export interface SpotifyTrackAlbumArtistType {
  external_urls: SpotifyTrackExternalUrlsType;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyTrackExternalUrlsType {
  spotify: string;
}

export interface SpotifyTrackImageType {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyTrackRestrictionsType {
  reason: string;
}

export interface SpotifyTrackArtistType {
  external_urls: SpotifyTrackExternalUrlsType;
  followers?: SpotifyTrackFollowersType;
  genres?: string[];
  href: string;
  id: string;
  images?: SpotifyTrackImageType[];
  name: string;
  popularity?: number;
  type: string;
  uri: string;
}

export interface SpotifyTrackFollowersType {
  href: string;
  total: number;
}

export interface SpotifyTrackExternalIDSType {
  isrc?: string;
  ean?: string;
  upc?: string;
}
