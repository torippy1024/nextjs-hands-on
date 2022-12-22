import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import validateSpotifyMePlaylists from '../lib/types/spotify/me/playlists/index.validator';
import SpotifyMePlaylistsType from '../lib/types/spotify/me/playlists';
import SessionLayout from '../lib/components/Layout/SessionLayout';

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
      const query = new URLSearchParams(params);
      fetch(`${baseUrl}?${query}`)
        .then((res) => res.json())
        .then((data) => {
          setPlaylists(validateSpotifyMePlaylists(data));
        })
        .catch((e) => console.error(e));
    }
  }, [session]);

  return (
    <SessionLayout session={session}>
      <div>
        {playlists &&
          playlists.items.map((playlist, index) => (
            <div key={index}>
              <Link href={`/playlists/${playlist.id}`}>
                {playlist.name} | {playlist.id}
              </Link>
              {/* <img src={playlist.imageUrl} /> */}
            </div>
          ))}
      </div>
    </SessionLayout>
  );
};

export default Home;
