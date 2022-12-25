import FeatureRadar, {FeatureRadarColor} from '.';
import {Session} from 'next-auth';
import useAudioFeatures from '../../hooks/useAudioFeatures';
import SpotifyAudioFeatureType from '../../types/spotify/audio-features';

type FeatureRadarType = {
  ids: string[];
  ids2?: string[];
  session: Session | null;
  label?: string;
  label2?: string;
};

const audioFeatureToData = (
  audioFeatures: (SpotifyAudioFeatureType | null)[],
) => {
  const features = audioFeatures.filter(
    (item): item is NonNullable<typeof item> => item != null,
  );
  const length = features.length;
  return {
    acousticness:
      features.reduce((sum, feature) => sum + feature.acousticness, 0) / length,
    danceability:
      features.reduce((sum, feature) => sum + feature.danceability, 0) / length,
    energy: features.reduce((sum, feature) => sum + feature.energy, 0) / length,
    liveness:
      features.reduce((sum, feature) => sum + feature.liveness, 0) / length,
    speechiness:
      features.reduce((sum, feature) => sum + feature.speechiness, 0) / length,
    valence:
      features.reduce((sum, feature) => sum + feature.acousticness, 0) / length,
  };
};

const IdsFeatureRadar = ({
  ids,
  ids2,
  session,
  label,
  label2,
}: FeatureRadarType) => {
  const {audioFeatures} = useAudioFeatures(ids, session);
  const {audioFeatures: audioFeatures2} = useAudioFeatures(ids2, session);

  return (
    <div>
      {audioFeatures &&
        audioFeatures.audio_features.filter((i) => i).length && (
          <FeatureRadar
            datasets={
              audioFeatures2
                ? [
                    {
                      label: label ?? 'audio feature1',
                      data: audioFeatureToData(audioFeatures.audio_features),
                    },
                    {
                      label: label2 ?? 'audio feature2',
                      data: audioFeatureToData(audioFeatures2.audio_features),
                      color: FeatureRadarColor.GREEN,
                    },
                  ]
                : [
                    {
                      label: label ?? 'audio feature',
                      data: audioFeatureToData(audioFeatures.audio_features),
                    },
                  ]
            }
          />
        )}
    </div>
  );
};

export default IdsFeatureRadar;
