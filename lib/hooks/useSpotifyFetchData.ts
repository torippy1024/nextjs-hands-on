import useSWR from 'swr';

export type FetcherType<T> = {
  baseUrl: string;
  params: {
    [key: string]: string;
  };
  validate: (value: unknown) => T;
  isReady?: boolean;
};

const fetcher = <T>({
  baseUrl,
  params,
  validate,
  isReady = true,
}: FetcherType<T>) => {
  if (isReady) {
    const query = new URLSearchParams(params);
    return fetch(`${baseUrl}?${query}`)
      .then((res) => {
        if (res.ok) {
          res.status;
          console.log(res.body);
          return res.json();
        }
        const error = new Error('res not ok');
        throw error;
      })
      .then((data) => {
        if (data) {
          return validate(data);
        }
        const error = new Error('hoge');
        throw error;
      });
  }
};

const useSpotifyFetchData = <T>({
  baseUrl,
  params,
  validate,
  isReady,
}: FetcherType<T>) => {
  return useSWR<T | undefined, Error>(
    {
      baseUrl,
      params,
      validate,
      isReady,
    },
    fetcher,
  );
};

export default useSpotifyFetchData;
