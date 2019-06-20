import { useEffect } from 'react';
import { Action } from 'typesafe-actions';

export const useFetchWithParam = <T>(param: T, fetchCb: (param: T) => Action) => {
  useEffect(() => {
    fetchCb(param);
  }, [param]);
};
