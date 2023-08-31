import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { store } from './src/redux/store';
import { loadFonts } from './src/utils/loadFonts';
import { RegistrationScreen } from './src/screens/auth/RegistrationScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { HomeScreen } from './src/screens/main/HomeScreen';
import { selectIsAuth } from './src/redux/auth/authSelector';
import { setUser } from './src/redux/auth/authSlice';
import { auth } from './src/firebase/firebase.config';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = {
          uid: user.uid,
          avatarUrl: user.photoURL,
          email: user.email,
          login: user.displayName,
        };
        setTimeout(() => {
          dispatch(setUser({ user: currentUser, isAuth: true }));
        }, 0);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Registration"
        screenOptions={{ headerShown: false }}
      >
        {!isAuth ? (
          <>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  const [isReady, setIsReady] = useState(false);

  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    (async () => {
      try {
        await loadFonts();
      } catch (e) {
        Alert.alert(e.message);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (!isReady) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
};
