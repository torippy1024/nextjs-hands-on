import {Session} from 'next-auth';
import validateSpotifyAudioFeatures from '../types/spotify/audio-features/ids.validator';
import useSpotifyFetchData from './useSpotifyFetchData';

const useAudioFeatures = (
  ids: string | string[] | undefined,
  session: Session | null,
) => {
  const {
    data: audioFeatures,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSpotifyFetchData({
    baseUrl: '/api/spotify/audio-features',
    params: {
      accessToken: session?.token.accessToken || '',
      ids: String(ids),
    },
    validate: validateSpotifyAudioFeatures,
    isReady: Boolean(ids && session && session.token.accessToken),
  });

  return {
    audioFeatures,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useAudioFeatures;
