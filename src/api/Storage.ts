import AsyncStorage from '@react-native-community/async-storage';

export const sessionStorageKey = '@sessionId';

export const setSessionid = async (sessionId: string) => {
  await AsyncStorage.setItem(sessionStorageKey, sessionId);
};

export const getSessionId = async () => {
  return AsyncStorage.getItem(sessionStorageKey);
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
