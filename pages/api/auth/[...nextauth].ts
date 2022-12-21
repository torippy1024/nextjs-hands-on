import NextAuth, {NextAuthOptions} from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scope = [
  'user-read-email',
  'playlist-read-private',
  'user-read-email',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
  'user-follow-read',
];

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization: `https://accounts.spotify.com/authorize?scope=${scope.join()}`,
    }),
  ],
  secret: process.env.SPOTIFY_CLIENT_SECRET,
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    jwt({token, account}) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    session({session, token}) {
      session.token = token;

      return session;
    },
  },
};

export default NextAuth(authOptions);
