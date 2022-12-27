import {Session} from 'next-auth';
import {signIn, signOut} from 'next-auth/react';
import {NextRouter} from 'next/router';
import {ReactNode} from 'react';
import Layout from '.';
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
      {session && <SearchBox router={router} />}
      {children}
    </Layout>
  );
};

export default SessionLayout;
