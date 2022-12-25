import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import IdsFeatureRadar from '../../lib/components/FeatureRadar/IdsFeatureRadar';
import SessionLayout from '../../lib/components/Layout/SessionLayout';
import usePlaylist from '../../lib/hooks/usePlaylist';
import useTrack from '../../lib/hooks/useTrack';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const router = useRouter();
  const {id} = router.query;

  const {track} = useTrack(id, session);
  const {playlist} = usePlaylist('37i9dQZF1DX9vYRBO9gjDe', session);

  return (
    <SessionLayout session={session}>
      <div className='font-bold text-3xl mt-4 mb-2 text-center underline decoration-red-300'>
        {track?.name}
      </div>
      {playlist && track && id && (
        <div>
          <IdsFeatureRadar
            ids={[id as string]}
            ids2={playlist.tracks.items.map((item) => item.track.id)}
            session={session}
            label={track.name}
            label2={playlist.name}
          />
        </div>
      )}
    </SessionLayout>
  );
};

export default Home;
