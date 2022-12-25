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
    <Layout
      headerElements={[
        {session} ? (
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
              signIn();
            }}
          >
            sign in
          </button>
        ),
      ]}
    >
      {children}
    </Layout>
  );
};

export default SessionLayout;
