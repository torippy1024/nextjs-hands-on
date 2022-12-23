import FeatureRadar from '.';
import {useState, useEffect} from 'react';
import SpotifyAudioFeaturesType from '../../types/spotify/audio-features/ids';
import validate from '../../types/spotify/audio-features/ids.validator';

type FeatureRadarType = {
  ids: string[];
  accessToken: string;
};

const IdsFeatureRadar = ({ids, accessToken}: FeatureRadarType) => {
  const [features, setFeatures] = useState<SpotifyAudioFeaturesType>();

  useEffect(() => {
    if (ids.length && accessToken) {
      const featuresUrl = `/api/spotify/audio-features`;
      const featuresParams = {
        accessToken: accessToken,
        ids: ids.join(','),
      };
      const featuresQuery = new URLSearchParams(featuresParams);
      fetch(`${featuresUrl}?${featuresQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setFeatures(validate(data));
        })
        .catch((e) => console.error(e));
    }
  }, [ids, accessToken]);
  return (
    <div>
      {features && features.audio_features.filter((i) => i).length && (
        <FeatureRadar
          acousticness={
            features.audio_features.reduce(
              (sum, feature) => sum + (feature ? feature.acousticness : 0),
              0,
            ) / features.audio_features.filter((i) => i).length
          }
          danceability={
            features.audio_features.reduce(
              (sum, feature) => sum + (feature ? feature.danceability : 0),
              0,
            ) / features.audio_features.filter((i) => i).length
          }
          energy={
            features.audio_features.reduce(
              (sum, feature) => sum + (feature ? feature.energy : 0),
              0,
            ) / features.audio_features.filter((i) => i).length
          }
          liveness={
            features.audio_features.reduce(
              (sum, feature) => sum + (feature ? feature.liveness : 0),
              0,
            ) / features.audio_features.filter((i) => i).length
          }
          speechiness={
            features.audio_features.reduce(
              (sum, feature) => sum + (feature ? feature.speechiness : 0),
              0,
            ) / features.audio_features.filter((i) => i).length
          }
          valence={
            features.audio_features.reduce(
              (sum, feature) => sum + (feature ? feature.acousticness : 0),
              0,
            ) / features.audio_features.filter((i) => i).length
          }
        />
      )}
    </div>
  );
};

export default IdsFeatureRadar;
