import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from '../Pages/List';
import Users from '../Pages/Users';
import InfoTarea from '../Pages/InfoTarea';
import Provider from '../Context/contextList'
const MainRouter: React.FC = () => {
    const Stack = createStackNavigator();
    return (
        <Provider>
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
                <Stack.Screen
                    name="InfoTarea"
                    component={InfoTarea}
                    options={{
                        headerShown: false
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
}
export default MainRouter;
