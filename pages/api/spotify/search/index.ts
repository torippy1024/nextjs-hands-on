import {NextApiRequest, NextApiResponse} from 'next';
import validateSpotifyMix from '../../../../lib/types/spotify/mix/index.validator';
import fetchSpotifyApi from '../../../../lib/utils/fetch/fetchSpotifyApi';

const getMix = async (
  accessToken: string,
  q: string,
  limit: number = 20,
  offset: number = 0,
  type: string = 'playlist,track',
) => {
  const baseUrl = 'https://api.spotify.com/v1/search';
  const params = {
    q,
    limit: String(limit),
    offset: String(offset),
    type,
  };

  return await fetchSpotifyApi({
    baseUrl,
    params,
    accessToken,
    validate: validateSpotifyMix,
  });
};

export default async function Search(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const {
      query: {accessToken, q},
    } = req;

    if (typeof accessToken !== 'string' || typeof q !== 'string') {
      return res.status(400).json({
        error: 'query error',
      });
    }

    const response = await getMix(accessToken, q);

    return res.status(200).json(response);
  }
}
