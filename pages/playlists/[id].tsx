import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import IdsFeatureRadar from '../../lib/components/FeatureRadar/IdsFeatureRadar';
import SessionLayout from '../../lib/components/Layout/SessionLayout';
import usePlaylist from '../../lib/hooks/usePlaylist';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const router = useRouter();
  const {id} = router.query;

  const {playlist} = usePlaylist(id, session);
  const {playlist: playlist2} = usePlaylist('37i9dQZF1DX9vYRBO9gjDe', session);

  return (
    <SessionLayout session={session}>
      <div className='font-bold text-3xl mt-4 mb-2 text-center'>
        {playlist?.name}
      </div>
      <div>
        {playlist && playlist2 && session && (
          <div>
            <IdsFeatureRadar
              ids={playlist.tracks.items.map((item) => item.track.id)}
              ids2={playlist2.tracks.items.map((item) => item.track.id)}
              session={session}
              label={playlist.name}
              label2={playlist2.name}
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
