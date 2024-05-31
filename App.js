import * as React from 'react';
import { Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './stylesheets/styles';
import StandingsScreen from './components/StandingsScreen';
import ProfileScreen from './components/ProfileScreen';
import HomeScreen from './components/HomeScreen';




const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#332B30',
                    tabBarInactiveBackgroundColor: '#4D4444',
                    tabBarStyle: { borderTopWidth: 0 },
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        let opacity = focused ? 1 : 0.5;

                        if (route.name === 'Home') {
                            iconName = require('./assets/home_icon.png');
                        } else if (route.name === 'Standings') {
                            iconName = require('./assets/standings_icon.png');
                        } else if (route.name === 'Profile') {
                            iconName = require('./assets/profile_icon.png');
                        }

                        return (
                            <Image
                                source={iconName}
                                style={{ width: 40, height: 40, opacity: opacity }}
                            />
                        );
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Standings" component={StandingsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
