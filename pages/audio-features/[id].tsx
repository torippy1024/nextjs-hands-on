import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import FeatureRadar from '../../lib/components/FeatureRadar';
import SessionLayout from '../../lib/components/Layout/SessionLayout';
import useAudioFeature from '../../lib/hooks/useAudioFeature';
import useTrack from '../../lib/hooks/useTrack';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const router = useRouter();
  const {id} = router.query;

  const {audioFeature} = useAudioFeature(id, session);
  const {track} = useTrack(id, session);

  return (
    <SessionLayout session={session}>
      <div className='font-bold text-3xl mt-4 mb-2 text-center'>
        {track?.name}
      </div>
      <div>
        {audioFeature && (
          <div>
            <FeatureRadar
              acousticness={audioFeature.acousticness}
              danceability={audioFeature.danceability}
              energy={audioFeature.energy}
              liveness={audioFeature.liveness}
              speechiness={audioFeature.speechiness}
              valence={audioFeature.valence}
            />
          </div>
        )}
        {!audioFeature && <div>Not Found</div>}
      </div>
    </SessionLayout>
  );
};

export default Home;
