import {Session} from 'next-auth';
import validateSpotifyTrack from '../types/spotify/tracks/index.validator';
import useSpotifyFetchData from './useSpotifyFetchData';

const useTrack = (
  id: string | string[] | undefined,
  session: Session | null,
) => {
  const {
    data: track,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSpotifyFetchData({
    baseUrl: `/api/spotify/tracks/${id}`,
    params: {
      accessToken: session?.token.accessToken || '',
    },
    validate: validateSpotifyTrack,
    isReady: Boolean(id && session && session.token.accessToken),
  });

  return {
    track,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useTrack;
