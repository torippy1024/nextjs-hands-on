import FeatureRadar from '.';
import {SpotifyAudioFeaturesType} from '../../types/spotify/audio-features';
import {useState, useEffect} from 'react';

type FeatureRadarType = {
  ids: string[];
  accessToken: string;
};

const IdsFeatureRadar = ({ids, accessToken}: FeatureRadarType) => {
  const [features, setFeatures] = useState<SpotifyAudioFeaturesType>();

  useEffect(() => {
    if (accessToken) {
      const featuresUrl = `/api/spotify/audio-features`;
      const featuresParams = {
        accessToken: accessToken,
        ids: ids.join(','),
      };
      const featuresQuery = new URLSearchParams(featuresParams);
      fetch(`${featuresUrl}?${featuresQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setFeatures(data);
        });
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
