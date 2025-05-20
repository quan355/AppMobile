import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens trước đăng nhập
import OnboardingScreen from './screens/OnboardingScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

// Screens sau đăng nhập
import HomeScreen from './screens/HomeScreen';
import AllRecipesScreen from './screens/AllRecipesScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfilepageScreen from './screens/ProfilepageScreen';
import CreateRecipeScreen from './screens/CreateRecipeScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import RecipeListByCategoryScreen from './screens/RecipeListByCategoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator cho các màn hình sau đăng nhập
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications';
          } else if (route.name === 'Profilepage') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff5555',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { height: 70, paddingTop: 10, backgroundColor: '#fff' },
        tabBarItemStyle: { paddingBottom: 5 },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Discover',
        }}
      />
      <Tab.Screen
        name="Add"
        component={CreateRecipeStack}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <Icon name="add" size={30} color="#fff" />
            </View>
          ),
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Notifications',
        }}
      />
      <Tab.Screen
        name="Profilepage"
        component={ProfilepageStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator cho HomeScreen
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AllRecipes" 
        component={AllRecipesScreen} 
        options={{ headerShown: false }}  
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Ẩn thanh tab khi ở RecipeDetail
        }}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeListByCategory"
        component={RecipeListByCategoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}



// Stack Navigator cho DiscoverScreen
function DiscoverStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiscoverMain"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          headerShown: false,
          tabBarVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator cho CreateRecipeScreen
function CreateRecipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateRecipeMain"
        component={CreateRecipeScreen}
        options={{
          headerShown: false,
          tabBarVisible: false,
        }}
      />
      
    </Stack.Navigator>
  );
}

// Stack Navigator cho NotificationsScreen
function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationsMain"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}

// Stack Navigator cho ProfilepageScreen
function ProfilepageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilepageMain"
        component={ProfilepageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        {/* Màn hình trước đăng nhập */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        {/* Màn hình sau đăng nhập với bottom tab */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#ff4444',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
    elevation: 5,
  },
});
