import {NextApiRequest, NextApiResponse} from 'next';
import validateSpotifyAudioFeatures from '../../../../lib/types/spotify/audio-features/ids.validator';
import fetchSpotifyApi from '../../../../lib/utils/fetch/fetchSpotifyApi';

const getAudioFeatures = async (accessToken: string, ids: string) => {
  const baseUrl = 'https://api.spotify.com/v1/audio-features';
  const params = {
    ids,
  };

  return await fetchSpotifyApi({
    baseUrl,
    params,
    accessToken,
    validate: validateSpotifyAudioFeatures,
  });
};

export default async function AudioFeatures(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const {
      query: {accessToken, ids},
    } = req;

    if (typeof accessToken !== 'string' || typeof ids !== 'string') {
      return res.status(400).json({
        error: 'query error',
      });
    }

    const response = await getAudioFeatures(accessToken, ids);

    return res.status(200).json(response);
  }
}
