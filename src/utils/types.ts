import { ActionType } from 'typesafe-actions';
import { Omit } from 'react-redux';
import { NavigationScreenComponent, NavigationStackScreenOptions, NavigationScreenProps } from 'react-navigation';

export type ActionTypeWithout<T, K extends keyof T> = ActionType<Omit<T, K>>;
export type StackScreenProps<TParams = {}> = NavigationScreenProps<TParams, NavigationStackScreenOptions>;
export type StackScreenComponent<TProps = {}, TParams = {}> = NavigationScreenComponent<
  TParams,
  NavigationStackScreenOptions,
  TProps
>;
