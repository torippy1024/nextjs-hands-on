import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import ExternalLink from '../../lib/components/ExternalLink';
import SessionLayout from '../../lib/components/Layout/SessionLayout';
import useSearch from '../../lib/hooks/useSearch';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const router = useRouter();
  const {q} = router.query;

  const {mix} = useSearch(session, q);

  return (
    <SessionLayout session={session} router={router}>
      <div className='my-4'>
        {mix && (
          <div>
            <div className='font-bold text-3xl mt-4 mb-2 underline decoration-blue-300'>
              {`"${q}"の検索結果`}
            </div>
            {mix.tracks?.items.map((track, index) => (
              <Link href={`/audio-features/${track.id}`} key={track.id}>
                <div className='flex justify-between border rounded p-2 bg-blue-50 hover:bg-blue-200 hover:border-blue-500'>
                  <div className='flex items-center'>
                    <div className='font-bold text-lg'>{track.name}</div>
                  </div>
                  <div>{track.artists.length && track.artists[0].name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </SessionLayout>
  );
};

export default Home;
