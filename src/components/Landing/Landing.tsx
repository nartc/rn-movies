import { getSessionId } from '@api/Storage';
import { LandingScreenProps } from '@screens/Landing/LandingScreen';
import { colors } from '@styles/Colors';
import CenterView from '@ui/CenterView';
import { StackScreenComponent } from '@utils/types';
import React, { useEffect } from 'react';
import { NavState, SafeAreaView } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Text } from 'react-native-elements';
import WebView from 'react-native-webview';

const Landing: StackScreenComponent<LandingScreenProps> = (
  {
    hasConfiguration,
    hasGenres,
    fetchConfiguration,
    fetchGenres,
    navigation,
    token,
    isLoading,
    requestToken,
    isTokenApproved,
    createSession
  }) => {

  useEffect(() => {
    getSessionId().then(sessionId => {
      if (!!sessionId) {
        createSession();
        navigation.navigate('AccountLandingStack');
      } else {
        requestToken();
      }
    });
  }, []);

  useEffect(() => {
    if (!hasConfiguration && !hasGenres) {
      fetchConfiguration();
      fetchGenres();
    }
  }, [hasConfiguration, hasGenres]);

  const onNavigationStateChange = (event: NavState) => {
    if (token && (event.url as string).indexOf(`${ token.request_token }/allow`) !== -1) {
      createSession();
      navigation.navigate('AccountLandingStack');
    }
  };

  return !token || isLoading ? (
    <CenterView>
      <Spinner isVisible={ true } color={ colors.primary }/>
      <Text style={ { fontSize: 12, color: colors.secondary } }>Initializing...</Text>
    </CenterView>
  ) : token && !isTokenApproved
      ? (
        <SafeAreaView style={ { flex: 1 } }>
          <WebView source={ { uri: `https://www.themoviedb.org/authenticate/${ token.request_token }` } }
                   onNavigationStateChange={ onNavigationStateChange }
                   originWhitelist={ ['react://, http://', 'https://'] }/>
        </SafeAreaView>
      ) : (
        <CenterView>
          <Spinner isVisible={ true } color={ colors.primary }/>
          <Text style={ { fontSize: 12, color: colors.secondary } }>Initializing...</Text>
        </CenterView>
      );
};

export default Landing;
