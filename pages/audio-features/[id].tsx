import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import FeatureRadar from '../../lib/components/FeatureRadar';
import SpotifyAudioFeatureType from '../../lib/types/spotify/audio-features';
import SessionLayout from '../../lib/components/Layout/SessionLayout';
import validateSpotifyAudioFeature from '../../lib/types/spotify/audio-features/index.validator';
import SpotifyTrackType from '../../lib/types/spotify/tracks';
import validateSpotifyTrack from '../../lib/types/spotify/tracks/index.validator';
import {fetchAndSetState} from '../../lib/utils/fetch/fetchAndSetState';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const [audioFeature, setAudioFeature] = useState<SpotifyAudioFeatureType>();
  const [track, setTrack] = useState<SpotifyTrackType>();
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (session && id) {
      const featureBaseUrl = `/api/spotify/audio-features/${id}`;
      const featureParams = {
        accessToken: session.token.accessToken as string,
      };
      fetchAndSetState({
        baseUrl: featureBaseUrl,
        params: featureParams,
        setState: setAudioFeature,
        validate: validateSpotifyAudioFeature,
      });

      const trackBaseUrl = `/api/spotify/tracks/${id}`;
      const trackParams = {
        accessToken: session.token.accessToken as string,
      };
      fetchAndSetState({
        baseUrl: trackBaseUrl,
        params: trackParams,
        setState: setTrack,
        validate: validateSpotifyTrack,
      });
    }
  }, [session, id]);

  return (
    <SessionLayout session={session}>
      <div className='font-bold text-3xl mt-4 mb-2 text-center'>
        {track?.name}
      </div>
      <div>
        {audioFeature && (
          <div>
            <FeatureRadar
              acousticness={audioFeature.acousticness}
              danceability={audioFeature.danceability}
              energy={audioFeature.energy}
              liveness={audioFeature.liveness}
              speechiness={audioFeature.speechiness}
              valence={audioFeature.valence}
            />
          </div>
        )}
        {!audioFeature && <div>Not Found</div>}
      </div>
    </SessionLayout>
  );
};

export default Home;
