import {SetStateAction} from 'react';

export const isNumber = (value: any) => {
  return !Number.isNaN(parseInt(value));
};

export type FetchAndSetStateType<T> = {
  baseUrl: string;
  params: {
    [key: string]: string;
  };
  setState: (value: SetStateAction<T | undefined>) => void;
  validate: (value: unknown) => T;
};

export const fetchAndSetState = <T>({
  baseUrl,
  params,
  setState,
  validate,
}: FetchAndSetStateType<T>) => {
  const query = new URLSearchParams(params);
  fetch(`${baseUrl}?${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        setState(validate(data));
      }
    })
    .catch((e) => console.error(e));
};

export type FetchSpotifyApiType<T> = {
  baseUrl: string;
  params: {
    [key: string]: string;
  };
  accessToken: string;
  validate: (value: unknown) => T;
};

export const fetchSpotifyApi = async <T>({
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
