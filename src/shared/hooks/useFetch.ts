import { useEffect } from 'react';
import { Action, ActionCreator, TypeConstant } from 'typesafe-actions';

export const useFetch = (fetchCb: () => Action) => {
  useEffect(() => {
    fetchCb();
  }, []);
};

export const useFetchWithPayload = <T extends TypeConstant = TypeConstant>(...args: any) => (fetchCb: ActionCreator<T>) => {
  useEffect(() => {
    fetchCb(...args);
  }, []);
};
