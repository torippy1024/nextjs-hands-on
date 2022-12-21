import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Footer from '../../lib/components/Footer';
import Header from '../../lib/components/Header';
import SpotifyEmbedded from '../../lib/components/SpotifyEmbedded';
import {SpotifyPlaylistType} from '../../lib/types/spotify/playlists';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {SpotifyAudioFeatureType} from '../../lib/types/spotify/audio-features';

const Home: NextPage = () => {
  const {data: session, status} = useSession();

  const [playlist, setPlaylist] = useState<SpotifyPlaylistType>();
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const [features, setFeatures] = useState<SpotifyAudioFeatureType[]>([]);
  const router = useRouter();
  const {id} = router.query;

  const getTrackIdsFromPlaylist = (playlist: SpotifyPlaylistType) => {
    return playlist.tracks.items.map((item) => item.track.id);
  };

  useEffect(() => {
    if (session) {
      const baseUrl = `/api/spotify/playlists/${id}`;
      const params = {
        accessToken: session.token.accessToken as string,
      };
      const query = new URLSearchParams(params);
      fetch(`${baseUrl}?${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.error) {
            console.error(data.error);
          } else {
            setPlaylist(data);
            const trackIds = getTrackIdsFromPlaylist(data);
            setTrackIds(trackIds);

            trackIds.slice(0, 10).map((trackId) => {
              const featureUrl = `/api/spotify/audio-features/${trackId}`;
              return fetch(`${featureUrl}?${query}`)
                .then((res) => res.json())
                .then((data) => {
                  setFeatures((features) => {
                    return [...features, data as SpotifyAudioFeatureType];
                  });
                });
            });
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
            <div>
              {playlist &&
                playlist.tracks.items.map((item, index) => (
                  <div key={index}>
                    <Link href={`/audio-features/${item.track.id}`}>
                      {item.track.name}
                    </Link>
                  </div>
                ))}
              {/* {trackIds &&
                trackIds.slice(0, 10).map((trackId, index) => (
                  <div key={index}>
                    <SpotifyEmbedded id={trackId} />
                  </div>
                ))} */}
              {/* {features &&
                features.map((feature, index) => (
                  <div key={index}>{JSON.stringify(feature)}</div>
                ))} */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
