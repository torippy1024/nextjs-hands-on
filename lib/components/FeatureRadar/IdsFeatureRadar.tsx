import FeatureRadar from '.';
import {Session} from 'next-auth';
import useAudioFeatures from '../../hooks/useAudioFeatures';

type FeatureRadarType = {
  ids: string[];
  session: Session | null;
};

const IdsFeatureRadar = ({ids, session}: FeatureRadarType) => {
  const {audioFeatures} = useAudioFeatures(ids, session);

  return (
    <div>
      {audioFeatures &&
        audioFeatures.audio_features.filter((i) => i).length && (
          <FeatureRadar
            acousticness={
              audioFeatures.audio_features.reduce(
                (sum, feature) => sum + (feature ? feature.acousticness : 0),
                0,
              ) / audioFeatures.audio_features.filter((i) => i).length
            }
            danceability={
              audioFeatures.audio_features.reduce(
                (sum, feature) => sum + (feature ? feature.danceability : 0),
                0,
              ) / audioFeatures.audio_features.filter((i) => i).length
            }
            energy={
              audioFeatures.audio_features.reduce(
                (sum, feature) => sum + (feature ? feature.energy : 0),
                0,
              ) / audioFeatures.audio_features.filter((i) => i).length
            }
            liveness={
              audioFeatures.audio_features.reduce(
                (sum, feature) => sum + (feature ? feature.liveness : 0),
                0,
              ) / audioFeatures.audio_features.filter((i) => i).length
            }
            speechiness={
              audioFeatures.audio_features.reduce(
                (sum, feature) => sum + (feature ? feature.speechiness : 0),
                0,
              ) / audioFeatures.audio_features.filter((i) => i).length
            }
            valence={
              audioFeatures.audio_features.reduce(
                (sum, feature) => sum + (feature ? feature.acousticness : 0),
                0,
              ) / audioFeatures.audio_features.filter((i) => i).length
            }
          />
        )}
    </div>
  );
};

export default IdsFeatureRadar;
