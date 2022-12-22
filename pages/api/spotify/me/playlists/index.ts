import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import {isNumber} from '../../../../../lib/utils';
import SpotifyMePlaylistsType from '../../../../../lib/types/spotify/me/playlists';

const getPlaylists = async (
  accessToken: string,
  offset: number,
  limit: number,
) => {
  const playlistsResponse = await axios.get<SpotifyMePlaylistsType>(
    `https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`,
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
      Number(offset),
      Number(limit),
    );

    return res.status(200).json(response);
  }
}
