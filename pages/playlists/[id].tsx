import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import IdsFeatureRadar from '../../lib/components/FeatureRadar/IdsFeatureRadar';
import SpotifyAudioFeaturesType from '../../lib/types/spotify/audio-features/ids';
import SpotifyPlaylistType from '../../lib/types/spotify/playlists';
import SessionLayout from '../../lib/components/Layout/SessionLayout';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const [playlist, setPlaylist] = useState<SpotifyPlaylistType>();
  const [feats, setFeats] = useState<SpotifyAudioFeaturesType>();
  const [ids, setIds] = useState<string[]>([]);
  const router = useRouter();
  const {id} = router.query;

  const getTrackIdsFromPlaylist = (playlist: SpotifyPlaylistType) => {
    return playlist.tracks.items.map((item) => item.track.id);
  };

  useEffect(() => {
    if (session) {
      const baseUrl = `/api/spotify/playlists/${id}`;
      const params = {
        accessToken: session.token.accessToken as string,
      };
      const query = new URLSearchParams(params);
      fetch(`${baseUrl}?${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.error) {
            console.error(data.error);
          } else {
            setPlaylist(data);
            const trackIds = getTrackIdsFromPlaylist(data);

            setIds(trackIds);
          }
        });
    }
  }, [session, id]);

  return (
    <SessionLayout session={session}>
      <div>
        {ids && session && (
          <div>
            <IdsFeatureRadar
              ids={ids}
              accessToken={session.token.accessToken as string}
            />
          </div>
        )}
        {playlist &&
          playlist.tracks.items.map((item, index) => (
            <div key={index}>
              <Link href={`/audio-features/${item.track.id}`}>
                {item.track.name}
              </Link>
            </div>
          ))}
      </div>
    </SessionLayout>
  );
};

export default Home;
