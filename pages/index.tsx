import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import validateSpotifyMePlaylists from '../lib/types/spotify/me/playlists/index.validator';
import SpotifyMePlaylistsType from '../lib/types/spotify/me/playlists';
import SessionLayout from '../lib/components/Layout/SessionLayout';
import {fetchAndSetState} from '../lib/utils';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const [playlists, setPlaylists] = useState<SpotifyMePlaylistsType>();

  useEffect(() => {
    if (session) {
      const baseUrl = '/api/spotify/me/playlists';
      const params = {
        accessToken: session.token.accessToken as string,
        page: '0',
        limit: '30',
      };

      fetchAndSetState({
        baseUrl,
        params,
        setState: setPlaylists,
        validate: validateSpotifyMePlaylists,
      });
    }
  }, [session]);

  return (
    <SessionLayout session={session}>
      <div className='my-4'>
        {playlists &&
          playlists.items.map((playlist, index) => (
            <Link href={`/playlists/${playlist.id}`} key={index}>
              <div className='flex justify-between border rounded p-2 bg-orange-50'>
                <div className='font-bold text-lg'>{playlist.name}</div>
                <div>{playlist.tracks.total} 曲</div>
              </div>
              {/* <img src={playlist.imageUrl} /> */}
            </Link>
          ))}
      </div>
    </SessionLayout>
  );
};

export default Home;
