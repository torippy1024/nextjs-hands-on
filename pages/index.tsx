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
        {playlists && (
          <div>
            <div className='font-bold text-3xl mt-4 mb-2 underline decoration-orange-300'>
              Your Playlists
            </div>
            {playlists.items.map((playlist, index) => (
              <Link href={`/playlists/${playlist.id}`} key={playlist.id}>
                <div className='flex justify-between border rounded p-2 bg-orange-50 hover:bg-orange-200 hover:border-orange-500'>
                  <div className='font-bold text-lg'>{playlist.name}</div>
                  <div>{playlist.tracks.total} 曲</div>
                </div>
                {/* <img src={playlist.imageUrl} /> */}
              </Link>
            ))}
          </div>
        )}
      </div>
    </SessionLayout>
  );
};

export default Home;
