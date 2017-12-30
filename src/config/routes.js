import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';
import * as screen from '../screens/screenTypes';

const HomeStackRoutes = {};

HomeStackRoutes[screen.HOME] = {
  screen: Home,
  navigationOptions: {
    header: () => null,
    headerTitle: screen.HOME,
  },
};
HomeStackRoutes[screen.THEMES] = {
  screen: Themes,
  navigationOptions: {
    headerTitle: screen.THEMES,
  },
};
HomeStackRoutes[screen.OPTIONS] = {
  screen: Options,
  navigationOptions: {
    headerTitle: screen.OPTIONS,
  },
};

const HomeStack = StackNavigator(HomeStackRoutes, {
  headerMode: 'screen',
});

const CurrencyListStack = StackNavigator({
  CurrencyList: {
    screen: CurrencyList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title,
    }),
  },
});

export default StackNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    CurrencyList: {
      screen: CurrencyListStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
);
