import {NextApiRequest, NextApiResponse} from 'next';
import validateSpotifyPlaylist from '../../../../lib/types/spotify/playlists/index.validator';
import fetchSpotifyApi from '../../../../lib/utils/fetch/fetchSpotifyApi';

const getPlaylist = async (accessToken: string, id: string) => {
  const baseUrl = `https://api.spotify.com/v1/playlists/${id}`;
  const params = {};

  return await fetchSpotifyApi({
    baseUrl,
    params,
    accessToken,
    validate: validateSpotifyPlaylist,
  });
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

    const response = await getPlaylist(accessToken, id);

    return res.status(200).json(response);
  }
}
