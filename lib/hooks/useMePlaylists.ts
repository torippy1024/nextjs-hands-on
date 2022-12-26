import {Session} from 'next-auth';
import validateSpotifyPlaylists from '../types/spotify/playlists/ids.validator';
import useSpotifyFetchData from './useSpotifyFetchData';

const useMePlaylists = (
  session: Session | null,
  page: number = 0,
  limit: number = 50,
) => {
  const {
    data: playlists,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSpotifyFetchData({
    baseUrl: '/api/spotify/me/playlists',
    params: {
      accessToken: session?.token.accessToken || '',
      page: String(page),
      limit: String(limit),
    },
    validate: validateSpotifyPlaylists,
    isReady: Boolean(session && session.token.accessToken),
  });

  return {
    playlists,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useMePlaylists;
