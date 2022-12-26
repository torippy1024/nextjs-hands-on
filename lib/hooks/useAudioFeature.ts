import {Session} from 'next-auth';
import validateSpotifyAudioFeature from '../types/spotify/audio-features/index.validator';
import useSpotifyFetchData from './useSpotifyFetchData';

const useAudioFeature = (
  id: string | string[] | undefined,
  session: Session | null,
) => {
  const {
    data: audioFeature,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSpotifyFetchData({
    baseUrl: `/api/spotify/audio-features/${id}`,
    params: {
      accessToken: session?.token.accessToken || '',
    },
    validate: validateSpotifyAudioFeature,
    isReady: Boolean(id && session && session.token.accessToken),
  });

  return {
    audioFeature,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useAudioFeature;
