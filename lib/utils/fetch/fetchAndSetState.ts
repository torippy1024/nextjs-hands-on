import {SetStateAction} from 'react';

export type FetchAndSetStateType<T> = {
  baseUrl: string;
  params: {
    [key: string]: string;
  };
  setState: (value: SetStateAction<T | undefined>) => void;
  validate: (value: unknown) => T;
};

const fetchAndSetState = <T>({
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

export default fetchAndSetState;
