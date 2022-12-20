import type {NextPage} from 'next';
import Link from 'next/link';
import Footer from '../lib/components/Footer';
import Header from '../lib/components/Header';
import {signIn, signOut, useSession} from 'next-auth/react';

const Home: NextPage = () => {
  const {data: session, status} = useSession();
  const loading = status === 'loading';

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
            <div>signed in as {session.user?.email ?? session.user?.name}</div>
            <button
              className='btn'
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              sign out
            </button>
          </div>
        )}
        {/* <div className='btn btn-primary'>
          <Link href='/api/auth/signin'>sign in</Link>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
