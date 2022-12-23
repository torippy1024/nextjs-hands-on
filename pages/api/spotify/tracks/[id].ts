import {NextApiRequest, NextApiResponse} from 'next';
import {fetchSpotifyApi} from '../../../../lib/utils';
import validateSpotifyTrack from '../../../../lib/types/spotify/tracks/index.validator';

const getTrack = async (accessToken: string, id: string) => {
  const baseUrl = `https://api.spotify.com/v1/tracks/${id}`;
  const params = {};

  return await fetchSpotifyApi({
    baseUrl,
    params,
    accessToken,
    validate: validateSpotifyTrack,
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

    const response = await getTrack(accessToken, id);

    return res.status(200).json(response);
  }
}
