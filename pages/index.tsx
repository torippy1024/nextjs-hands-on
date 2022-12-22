import type {NextPage} from 'next';
import Footer from '../lib/components/Footer';
import Header from '../lib/components/Header';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import validateSpotifyMePlaylists from '../lib/types/spotify/me/playlists/index.validator';
import SpotifyMePlaylistsType from '../lib/types/spotify/me/playlists';

const Home: NextPage = () => {
  const {data: session, status} = useSession();

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
            {session.token.accessToken}
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
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
