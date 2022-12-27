import {Session} from 'next-auth';
import {signIn, signOut} from 'next-auth/react';
import Image from 'next/image';
import {NextRouter} from 'next/router';
import {ReactNode} from 'react';
import Layout from '.';
import ExternalLink from '../ExternalLink';
import SearchBox from '../SearchBox';

type SessionLayoutType = {
  children: ReactNode;
  session: Session | null;
  router: NextRouter;
};

const SessionLayout = ({children, session, router}: SessionLayoutType) => {
  return (
    <Layout
      headerElements={[
        session ? (
          <button
            key='signOut'
            className='btn mr-2'
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            sign out
          </button>
        ) : (
          <button
            key='signIn'
            className='btn mr-2'
            onClick={(e) => {
              e.preventDefault();
              signIn('spotify');
            }}
          >
            sign in
          </button>
        ),
      ]}
    >
      <div className='mb-4'>
        感想は
        <ExternalLink href='https://forms.gle/Fqn8wPbPyaRj5HJY7'>
          こちら
        </ExternalLink>
        から！
      </div>
      {!session && (
        <div>
          <div
            className={`
              py-2 text-center
              font-bold text-4xl tracking-tight
              bg-gradient-to-r to-green-400 from-black
              bg-clip-text text-transparent
            `}
          >
            Spotify Analytics
          </div>
          <div className='text-center my-2'>
            自分のSpotifyプレイリストやお気に入りの楽曲の特徴をレーダーチャートでチェックできます
          </div>
          <div className='text-center text-sm my-2'>
            ※ご利用には
            <button
              className='link link-primary'
              onClick={() => signIn('spotify')}
            >
              サインイン
            </button>
            が必要です
          </div>
          <div className='relative aspect-square my-4 border rounded'>
            <Image
              className='object-contain link'
              src='/radarSample.png'
              alt='サンプル'
              fill
              onClick={() => signIn('spotify')}
            />
          </div>
        </div>
      )}
      {session && (
        <div>
          <SearchBox router={router} />
        </div>
      )}
      {children}
      <div className='mt-4'>
        感想は
        <ExternalLink href='https://forms.gle/Fqn8wPbPyaRj5HJY7'>
          こちら
        </ExternalLink>
        から！
      </div>
    </Layout>
  );
};

export default SessionLayout;
