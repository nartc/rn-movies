import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import MoviesScreen from '@screens/Movies/MoviesScreen';
import ShowsScreen from '@screens/Shows/ShowsScreen';
import PersonalScreen from '@screens/Personal/PersonalScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import { Icon } from 'react-native-elements';

const moviesStack = createStackNavigator(
  {
    Movies: {
      screen: MoviesScreen
    }
  },
  {
    initialRouteName: 'Movies',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#000'
    }
  }
);

const showsStack = createStackNavigator(
  {
    Shows: {
      screen: ShowsScreen
    }
  },
  {
    initialRouteName: 'Shows',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#000'
    }
  }
);

const personalStack = createStackNavigator(
  {
    Personal: {
      screen: PersonalScreen
    }
  },
  {
    initialRouteName: 'Personal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#000'
    }
  }
);

const settingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    initialRouteName: 'Settings',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#000'
    }
  }
);

const mainTabNavigator = createBottomTabNavigator(
  {
    MoviesStack: {
      screen: moviesStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => <Icon name="movie-roll" type={'material-community'} color={tintColor} />
      }
    },
    ShowsStack: {
      screen: showsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name="television-classic" type={'material-community'} color={tintColor} />
        )
      }
    },
    PersonalStack: {
      screen: personalStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name="account-outline" type={'material-community'} color={tintColor} />
        )
      }
    },
    SettingsStack: {
      screen: settingsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name="settings-outline" type={'material-community'} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'MoviesStack',
    tabBarOptions: {
      activeTintColor: '#f00',
      inactiveTintColor: '#444',
      showLabel: false
    }
  }
);

export default createAppContainer(mainTabNavigator);
