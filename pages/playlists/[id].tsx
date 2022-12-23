import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import IdsFeatureRadar from '../../lib/components/FeatureRadar/IdsFeatureRadar';
import SpotifyAudioFeaturesType from '../../lib/types/spotify/audio-features/ids';
import SpotifyPlaylistType from '../../lib/types/spotify/playlists';
import SessionLayout from '../../lib/components/Layout/SessionLayout';
import validateSpotifyPlaylist from '../../lib/types/spotify/playlists/index.validator';

const Home: NextPage = () => {
  const {data: session} = useSession();

  const [playlist, setPlaylist] = useState<SpotifyPlaylistType>();
  const [trackIds, setTrackIds] = useState<string[]>([]);
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
          const playlist = validateSpotifyPlaylist(data);
          const trackIds = getTrackIdsFromPlaylist(playlist);
          setPlaylist(playlist);
          setTrackIds(trackIds);
        })
        .catch((e) => console.error(e));
    }
  }, [session, id]);

  return (
    <SessionLayout session={session}>
      <div className='font-bold text-3xl mt-4 mb-2 text-center'>
        {playlist?.name}
      </div>
      <div>
        {trackIds && session && (
          <div>
            <IdsFeatureRadar
              ids={trackIds}
              accessToken={session.token.accessToken as string}
            />
          </div>
        )}
        {playlist &&
          playlist.tracks.items.map((item, index) => (
            <Link href={`/audio-features/${item.track.id}`} key={index}>
              <div className='flex justify-between border rounded p-2 bg-cyan-50'>
                <div className='font-bold text-lg'>
                  {index + 1}: {item.track.name}
                </div>
                <div>
                  {item.track.artists.length && item.track.artists[0].name}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </SessionLayout>
  );
};

export default Home;
