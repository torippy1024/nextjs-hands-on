import {Session} from 'next-auth';
import validateSpotifyPlaylist from '../types/spotify/playlists/index.validator';
import useSpotifyFetchData from './useSpotifyFetchData';

const usePlaylist = (
  id: string | string[] | undefined,
  session: Session | null,
) => {
  const {
    data: playlist,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSpotifyFetchData({
    baseUrl: `/api/spotify/playlists/${id}`,
    params: {
      accessToken: session?.token.accessToken || '',
    },
    validate: validateSpotifyPlaylist,
    isReady: Boolean(id && session && session.token.accessToken),
  });

  return {
    playlist,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default usePlaylist;
