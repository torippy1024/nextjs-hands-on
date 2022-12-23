import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import IdsFeatureRadar from '../../lib/components/FeatureRadar/IdsFeatureRadar';
import SpotifyPlaylistType from '../../lib/types/spotify/playlists';
import SessionLayout from '../../lib/components/Layout/SessionLayout';
import validateSpotifyPlaylist from '../../lib/types/spotify/playlists/index.validator';
import {fetchAndSetState} from '../../lib/utils/fetch/fetchAndSetState';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const [playlist, setPlaylist] = useState<SpotifyPlaylistType>();
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (session) {
      const baseUrl = `/api/spotify/playlists/${id}`;
      const params = {
        accessToken: session.token.accessToken as string,
      };

      fetchAndSetState({
        baseUrl,
        params,
        setState: setPlaylist,
        validate: validateSpotifyPlaylist,
      });
    }
  }, [session, id]);

  return (
    <SessionLayout session={session}>
      <div className='font-bold text-3xl mt-4 mb-2 text-center'>
        {playlist?.name}
      </div>
      <div>
        {playlist && session && (
          <div>
            <IdsFeatureRadar
              ids={playlist.tracks.items.map((item) => item.track.id)}
              accessToken={session.token.accessToken as string}
            />
          </div>
        )}
        {playlist &&
          playlist.tracks.items.map((item, index) => (
            <Link href={`/audio-features/${item.track.id}`} key={index}>
              <div className='flex justify-between border rounded p-2 bg-cyan-50'>
                <div className='font-bold text-lg'>
                  {index + 1}: {item.track.name}
                </div>
                <div>
                  {item.track.artists.length && item.track.artists[0].name}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </SessionLayout>
  );
};

export default Home;
