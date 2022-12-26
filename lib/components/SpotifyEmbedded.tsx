type SpotifyEmbeddedType = {
  id: string;
  height?: number;
  darkTheme?: boolean;
};

const SpotifyEmbedded = ({
  id,
  height = 152,
  darkTheme = false,
}: SpotifyEmbeddedType) => {
  return (
    <div>
      <iframe
        style={{borderRadius: '12px'}}
        src={`https://open.spotify.com/embed/track/${id}?utm_source=generator${
          darkTheme && '&theme=0'
        }`}
        width='100%'
        height={height}
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      ></iframe>
    </div>
  );
};

export default SpotifyEmbedded;
