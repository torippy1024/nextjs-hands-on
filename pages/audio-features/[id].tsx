import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import FeatureRadar from '../../lib/components/FeatureRadar';
import SpotifyAudioFeatureType from '../../lib/types/spotify/audio-features';
import SessionLayout from '../../lib/components/Layout/SessionLayout';
import validateSpotifyAudioFeature from '../../lib/types/spotify/audio-features/index.validator';
import {fetchAndSetState} from '../../lib/utils';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const [audioFeature, setAudioFeature] = useState<SpotifyAudioFeatureType>();
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (session && id) {
      const baseUrl = `/api/spotify/audio-features/${id}`;
      const params = {
        accessToken: session.token.accessToken as string,
      };
      fetchAndSetState({
        baseUrl,
        params,
        setState: setAudioFeature,
        validate: validateSpotifyAudioFeature,
      });
    }
  }, [session, id]);

  return (
    <SessionLayout session={session}>
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
