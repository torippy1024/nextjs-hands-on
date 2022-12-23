import {NextApiRequest, NextApiResponse} from 'next';
import validateSpotifyMePlaylists from '../../../../../lib/types/spotify/me/playlists/index.validator';
import {isNumber} from '../../../../../lib/utils';
import fetchSpotifyApi from '../../../../../lib/utils/fetch/fetchSpotifyApi';

const getPlaylists = async (
  accessToken: string,
  offset: string,
  limit: string,
) => {
  const baseUrl = 'https://api.spotify.com/v1/me/playlists';
  const params = {
    offset,
    limit,
  };

  return await fetchSpotifyApi({
    baseUrl,
    params,
    accessToken,
    validate: validateSpotifyMePlaylists,
  });
};

export default async function playlists(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const {
      query: {accessToken, page, limit},
    } = req;

    if (
      typeof accessToken !== 'string' ||
      !isNumber(page) ||
      !isNumber(limit)
    ) {
      return res.status(400).json({
        error: 'query error',
      });
    }

    const offset = Number(page) * Number(limit);

    const response = await getPlaylists(
      accessToken,
      String(offset),
      String(limit),
    );

    return res.status(200).json(response);
  }
}
