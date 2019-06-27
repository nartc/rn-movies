import { ComponentType } from 'react';
import { ActionType } from 'typesafe-actions';
import { NavigationScreenComponent, NavigationStackScreenOptions, NavigationScreenProps } from 'react-navigation';

export type ActionTypeWithout<T, K extends keyof T> = ActionType<Omit<T, K>>;
export type StackScreenProps<TParams = {}> = NavigationScreenProps<TParams, NavigationStackScreenOptions>;
export type StackScreenComponent<TProps = {}, TParams = {}> = NavigationScreenComponent<TParams,
  NavigationStackScreenOptions,
  TProps>;

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
export type AnimatedComponent<T, N = {}> = ComponentType<Merge<T, N>>;
