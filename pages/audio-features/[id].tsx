import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Footer from '../../lib/components/Footer';
import Header from '../../lib/components/Header';
import SpotifyEmbedded from '../../lib/components/SpotifyEmbedded';
import {SpotifyPlaylistType} from '../../lib/types/spotify/playlists';
import Link from 'next/link';
import {SpotifyAudioFeatureType} from '../../lib/types/spotify/audio-features';
import {useRouter} from 'next/router';
import FeatureRadar from '../../lib/components/FeatureRadar';

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
          if (data?.error) {
            console.log(data.error);
          } else {
            setAudioFeature(data);
          }
        });
    }
  }, [session, id]);

  return (
    <div data-theme='light' className='flex flex-col min-h-screen'>
      <Header />
      <div className='grow container mx-auto my-4 px-4'>
        {!session && (
          <div>
            <div>not signed in...</div>
            <button
              className='btn'
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              sign in
            </button>
          </div>
        )}
        {session && (
          <div>
            <div>signed in as {session.user?.name}</div>
            <button
              className='btn'
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              sign out
            </button>
            {/* <div className=' whitespace-pre-wrap'>
              {audioFeature && JSON.stringify(audioFeature, null, 2)}
            </div> */}
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
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
