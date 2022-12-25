import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import SessionLayout from '../lib/components/Layout/SessionLayout';
import useMePlaylists from '../lib/hooks/useMePlaylists';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const {playlists} = useMePlaylists(session);

  return (
    <SessionLayout session={session}>
      <div className='my-4'>
        {playlists &&
          playlists.items.map((playlist, index) => (
            <Link href={`/playlists/${playlist.id}`} key={playlist.id}>
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
