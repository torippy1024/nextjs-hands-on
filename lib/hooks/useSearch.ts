import {Session} from 'next-auth';
import validateSpotifyMix from '../types/spotify/mix/index.validator';
import useSpotifyFetchData from './useSpotifyFetchData';

const useSearch = (
  session: Session | null,
  q: string | string[] | undefined,
  limit: number = 20,
  offset: number = 0,
  type: string[] = ['track'],
) => {
  const {
    data: mix,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSpotifyFetchData({
    baseUrl: '/api/spotify/search',
    params: {
      accessToken: session?.token.accessToken || '',
      q: String(q) || '',
      limit: String(limit),
      offset: String(offset),
      type: type.join(','),
    },
    validate: validateSpotifyMix,
    isReady: Boolean(session && session.token.accessToken),
  });

  return {
    mix,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useSearch;
