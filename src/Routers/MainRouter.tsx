import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from '../Pages/List'
import Users from '../Pages/Users'
const MainRouter: React.FC = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="List"
                    component={List}
                    options={{
                        headerShown: false
                    }} />
                                    <Stack.Screen
                    name="Users"
                    component={Users}
                    options={{
                        headerShown: false
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default MainRouter;
