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
      {features && (
        <FeatureRadar
          acousticness={
            features.audio_features.reduce(
              (sum, feature) => sum + feature.acousticness,
              0,
            ) / features.audio_features.length
          }
          danceability={
            features.audio_features.reduce(
              (sum, feature) => sum + feature.danceability,
              0,
            ) / features.audio_features.length
          }
          energy={
            features.audio_features.reduce(
              (sum, feature) => sum + feature.energy,
              0,
            ) / features.audio_features.length
          }
          liveness={
            features.audio_features.reduce(
              (sum, feature) => sum + feature.liveness,
              0,
            ) / features.audio_features.length
          }
          speechiness={
            features.audio_features.reduce(
              (sum, feature) => sum + feature.speechiness,
              0,
            ) / features.audio_features.length
          }
          valence={
            features.audio_features.reduce(
              (sum, feature) => sum + feature.acousticness,
              0,
            ) / features.audio_features.length
          }
        />
      )}
    </div>
  );
};

export default IdsFeatureRadar;
