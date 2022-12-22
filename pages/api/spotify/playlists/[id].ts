import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import SpotifyPlaylistType from '../../../../lib/types/spotify/playlists';

const getPlaylists = async (accessToken: string, id: string) => {
  const playlistsResponse = await axios.get<SpotifyPlaylistType>(
    `https://api.spotify.com/v1/playlists/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return playlistsResponse.data;
};

export default async function playlists(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {id} = req.query;
  if (req.method === 'GET') {
    const {
      query: {accessToken},
    } = req;

    if (typeof accessToken !== 'string' || typeof id !== 'string') {
      return res.status(400).json({
        error: 'query error',
      });
    }

    const response = await getPlaylists(accessToken, id);

    return res.status(200).json(response);
  }
}
