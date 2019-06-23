import { AccountLandingScreenProps } from '@screens/AccountLanding/AccountLandingScreen';
import { colors } from '@styles/Colors';
import CenterView from '@ui/CenterView';
import { StackScreenComponent } from '@utils/types';
import React, { useEffect } from 'react';
import { Text } from 'react-native-elements';
import Spinner from 'react-native-spinkit';

const AccountLanding: StackScreenComponent<AccountLandingScreenProps> = (
  {
    isLoading,
    isLoadingSession,
    isAccountFetched,
    getAccountDetail,
    navigation
  }) => {

  useEffect(() => {
    if (!isLoadingSession && !isAccountFetched) {
      getAccountDetail();
    } else if (isAccountFetched) {
      navigation.navigate('MainTab');
    }
  }, [isLoadingSession, isAccountFetched]);

  return (
    <CenterView>
      <Spinner isVisible={ true } color={ colors.primary }/>
      <Text style={ { fontSize: 12, color: colors.secondary } }>
        { isLoadingSession ? 'Loading session...' : 'Loading account...' }
      </Text>
    </CenterView>
  );
};

export default AccountLanding;
