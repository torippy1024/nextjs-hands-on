import {Session} from 'next-auth';
import {signIn, signOut} from 'next-auth/react';
import {ReactNode} from 'react';
import Layout from '.';

type SessionLayoutType = {
  children: ReactNode;
  session: Session | null;
};

const SessionLayout = ({children, session}: SessionLayoutType) => {
  return (
    <Layout>
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
      {children}
    </Layout>
  );
};

export default SessionLayout;
