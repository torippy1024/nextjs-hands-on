import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Footer from '../../lib/components/Footer';
import Header from '../../lib/components/Header';
import {useRouter} from 'next/router';
import FeatureRadar from '../../lib/components/FeatureRadar';
import SpotifyAudioFeatureType from '../../lib/types/spotify/audio-features';
import validate from '../../lib/types/spotify/audio-features/index.validator';
import SessionLayout from '../../lib/components/Layout/SessionLayout';

const Home: NextPage = () => {
  const {data: session, status} = useSession();

  const [audioFeature, setAudioFeature] = useState<SpotifyAudioFeatureType>();
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (session) {
      const baseUrl = `/api/spotify/audio-features/${id}`;
      const params = {
        accessToken: session.token.accessToken as string,
      };
      const query = new URLSearchParams(params);
      fetch(`${baseUrl}?${query}`)
        .then((res) => res.json())
        .then((data) => {
          setAudioFeature(validate(data));
        })
        .catch((e) => console.error(e));
    }
  }, [session, id]);

  return (
    <SessionLayout session={session}>
      <div>
        {session &&
          session.token &&
          session.token.accessTokenExpires &&
          new Date(session.token.accessTokenExpires).toString()}
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
      </div>
    </SessionLayout>
  );
};

export default Home;
