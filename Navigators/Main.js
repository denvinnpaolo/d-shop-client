import React, { useContext } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from 'react-native';
import { FontAwesome as Icon} from '@expo/vector-icons'

// Stacks
import AdminNavigator from './AdminNavigator.js'
import HomeNavigator from './HomeNavigator.js';
import CartNavigator from './CartNavigator.js';
import UserNavigator from './UserNavigator.js';

import CartIcon from '../Shared/CartIcon.js';
import AuthGlobal from '../Context/store/AuthGlobal.js';

const Tab = createBottomTabNavigator();


const Main = () => {
    const context = useContext(AuthGlobal);
    return(
        <Tab.Navigator
            initialRouteName="Home" 
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#e91e63'
            }}
        > 
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            name="home"
                            color={color}
                            size={30}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <View><Icon
                            name="shopping-cart"
                            color={color}
                            size={30}
                        />
                        <CartIcon />
                        </View>
                    ),
                    headerShown: false
                }}
            />
            {context.stateUser.user.isAdmin == true? 
                <Tab.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            name="cog"
                            color={color}
                            size={30}
                        />
                    ),
                    headerShown: false
                }}
            />
            : null
            }
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            name="user"
                            color={color}
                            size={30}
                        />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
};

export default Main;