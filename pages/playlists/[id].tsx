import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Footer from '../../lib/components/Footer';
import Header from '../../lib/components/Header';
import {SpotifyPlaylistType} from '../../lib/types/spotify/playlists';
import Link from 'next/link';
import {useRouter} from 'next/router';
import FeatureRadar from '../../lib/components/FeatureRadar';
import IdsFeatureRadar from '../../lib/components/FeatureRadar/IdsFeatureRadar';
import SpotifyAudioFeaturesType from '../../lib/types/spotify/audio-features/ids';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const [playlist, setPlaylist] = useState<SpotifyPlaylistType>();
  const [feats, setFeats] = useState<SpotifyAudioFeaturesType>();
  const [ids, setIds] = useState<string[]>([]);
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

            setIds(trackIds);
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
              {ids && session && (
                <div>
                  <IdsFeatureRadar
                    ids={ids}
                    accessToken={session.token.accessToken as string}
                  />
                </div>
              )}
              {playlist &&
                playlist.tracks.items.map((item, index) => (
                  <div key={index}>
                    <Link href={`/audio-features/${item.track.id}`}>
                      {item.track.name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
