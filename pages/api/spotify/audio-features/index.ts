import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import {SpotifyAudioFeaturesType} from '../../../../lib/types/spotify/audio-features';

const getAudioFeatures = async (accessToken: string, ids: string) => {
  const playlistsResponse = await axios.get<SpotifyAudioFeaturesType>(
    `https://api.spotify.com/v1/audio-features?ids=${ids}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return playlistsResponse.data;
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
