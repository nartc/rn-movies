import AccountLandingScreen from '@screens/AccountLanding/AccountLandingScreen';
import LandingScreen from '@screens/Landing/LandingScreen';
import MovieDetailModalScreen from '@screens/Movies/MovieDetailModalScreen';
import FilterMoviesScreen from '@screens/Movies/FilterMoviesScreen';
import PersonalListScreen from '@screens/Personal/PersonalListScreen';
import FilterShowsScreen from '@screens/Shows/FilterShowsScreen';
import ShowDetailModalScreen from '@screens/Shows/ShowDetailModalScreen';
import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import MoviesScreen from '@screens/Movies/MoviesScreen';
import ShowsScreen from '@screens/Shows/ShowsScreen';
import PersonalScreen from '@screens/Personal/PersonalScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import { Icon } from 'react-native-elements';
import { colors } from '@styles/Colors';

const moviesStack = createStackNavigator(
  {
    Movies: MoviesScreen,
    FilterMovies: FilterMoviesScreen
  },
  {
    initialRouteName: 'Movies',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: colors.default
    }
  }
);

const showsStack = createStackNavigator(
  {
    Shows: ShowsScreen,
    FilterShows: FilterShowsScreen
  },
  {
    initialRouteName: 'Shows',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: colors.default
    }
  }
);

const personalStack = createStackNavigator(
  {
    Personal: PersonalScreen,
    PersonalList: PersonalListScreen
  },
  {
    initialRouteName: 'Personal',
    cardStyle: {
      backgroundColor: colors.default
    },
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      headerTintColor: colors.secondary,
      headerStyle: {
        backgroundColor: colors.default
      }
    })
  }
);

const settingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Settings',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: colors.default
    }
  }
);

const mainTabNavigator = createBottomTabNavigator(
  {
    MoviesStack: {
      screen: moviesStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => <Icon name="movie-roll" color={ tintColor }/>
      }
    },
    ShowsStack: {
      screen: showsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name="television-classic" color={ tintColor }/>
        )
      }
    },
    PersonalStack: {
      screen: personalStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name="account-outline" color={ tintColor }/>
        )
      }
    },
    SettingsStack: {
      screen: settingsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name="settings-outline" color={ tintColor }/>
        )
      }
    }
  },
  {
    initialRouteName: 'MoviesStack',
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.dark,
      showLabel: false
    }
  }
);

const landingStack = createStackNavigator({
  Landing: LandingScreen
}, {
  initialRouteName: 'Landing',
  headerMode: 'none',
  cardStyle: {
    backgroundColor: colors.default
  }
});

const accountLandingStack = createStackNavigator({
  AccountLanding: AccountLandingScreen
}, {
  initialRouteName: 'AccountLanding',
  headerMode: 'none',
  cardStyle: {
    backgroundColor: colors.default
  }
});

const appStack = createStackNavigator({
  MainTab: mainTabNavigator,
  MovieDetails: MovieDetailModalScreen,
  ShowDetails: ShowDetailModalScreen,
}, {
  mode: 'modal',
  initialRouteName: 'MainTab',
  headerMode: 'none',
  cardStyle: {
    backgroundColor: colors.default
  }
});

const mainNavigator = createSwitchNavigator(
  {
    LandingStack: landingStack,
    AccountLandingStack: accountLandingStack,
    MainTab: appStack
  },
  {
    initialRouteName: 'LandingStack',
  }
);

export default createAppContainer(mainNavigator);
