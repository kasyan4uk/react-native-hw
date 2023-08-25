import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import CommentsScreen from './CommentsScreen';
import MapScreen from './MapScreen';
import colors from '../../assets/colors/colors';
import { common } from '../../components/common';

const { MainContainer } = common;
const Tabs = createBottomTabNavigator();

export const HomeScreen = ({ navigation }) => {
  return (
    <MainContainer>
      <Tabs.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
            paddingHorizontal: 80,
            paddingTop: 10,
            paddingBottom: 20,
          },
          tabBarActiveBackgroundColor: colors.ACCENT_COLOR,
          tabBarInactiveBackgroundColor: 'transparent',
          tabBarActiveTintColor: colors.PRIMARY_BG,
          tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
          tabBarItemStyle: {
            height: 40,
            width: 70,
            borderRadius: 20,
          },
        }}
      >
        <Tabs.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="grid" size={24} color={color} />
            ),
            headerStyle: styles.headerWrap,
            headerTitleStyle: styles.headerTitle,
            headerPressColor: colors.ACCENT_COLOR,
            title: 'Публікації',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                style={{ paddingRight: 16 }}
                onPress={() => navigation.navigate('Login')}
              >
                <Feather
                  name="log-out"
                  size={24}
                  color={colors.SECONDARY_TEXT_COLOR}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="plus" size={24} color={color} />
            ),
            headerStyle: styles.headerWrap,
            headerTitleStyle: styles.headerTitle,
            headerPressColor: colors.ACCENT_COLOR,
            title: 'Створити публікацію',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 16 }}
                onPress={() => navigation.navigate('Posts')}
              >
                <MaterialIcons
                  name="keyboard-backspace"
                  size={24}
                  color={colors.PRIMARY_TEXT_COLOR}
                />
              </TouchableOpacity>
            ),
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            tabBarStyle: {
              display: 'none',
            },
            tabBarItemStyle: { display: 'none' },
            headerStyle: styles.headerWrap,
            headerTitleStyle: styles.headerTitle,
            headerPressColor: colors.ACCENT_COLOR,
            title: 'Comments',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 16 }}
                onPress={() => navigation.navigate('Posts')}
              >
                <MaterialIcons
                  name="keyboard-backspace"
                  size={24}
                  color={colors.PRIMARY_TEXT_COLOR}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarStyle: {
              display: 'none',
            },
            tabBarItemStyle: { display: 'none' },
            headerStyle: styles.headerWrap,
            headerTitleStyle: styles.headerTitle,
            headerPressColor: colors.ACCENT_COLOR,
            title: 'Map',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 16 }}
                onPress={() => navigation.navigate('Posts')}
              >
                <MaterialIcons
                  name="keyboard-backspace"
                  size={24}
                  color={colors.PRIMARY_TEXT_COLOR}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs.Navigator>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    borderBottomWidth: 1,
    borderBottomColor: colors.SECONDARY_TEXT_COLOR,
  },
  headerTitle: {
    fontFamily: 'roboto-medium',
    fontSize: 17,
    lineHeight: 22,
    color: colors.PRIMARY_TEXT_COLOR,
  },
});