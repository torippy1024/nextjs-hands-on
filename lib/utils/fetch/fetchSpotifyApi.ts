export type FetchSpotifyApiType<T> = {
  baseUrl: string;
  params: {
    [key: string]: string;
  };
  accessToken: string;
  validate: (value: unknown) => T;
};

const fetchSpotifyApi = async <T>({
  baseUrl,
  params,
  accessToken,
  validate,
}: FetchSpotifyApiType<T>) => {
  const query = new URLSearchParams(params);
  const url = `${baseUrl}?${query}`;
  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => validate(data))
    .catch((e) => console.error(e));
};

export default fetchSpotifyApi;
