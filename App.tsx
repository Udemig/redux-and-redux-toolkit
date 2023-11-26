import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreen from './src/pages/ProductScreen';
import CartScreen from './src/pages/CartScreen';
import ProductDetail from './src/pages/ProductDetail';
import {Provider} from 'react-redux';
// import store from './src/redux/store';
import ShoppingCartIcon from './src/components/ShoppingCartIcon';
import store from './src/app/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Products"
            component={ProductScreen}
            options={{headerRight: () => <ShoppingCartIcon />}}
          />
          <Stack.Screen name="Carts" component={CartScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
