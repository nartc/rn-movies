import { useEffect } from 'react';
import { Action } from 'typesafe-actions';

export const useFetch = (fetchCb: () => Action) => {
  useEffect(() => {
    fetchCb();
  }, []);
};
