import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/HomeScreen'
import TableScreen from './src/TableScreen'
import RacerScreen from './src/RacerScreen'


const Stack = createStackNavigator()


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#fff',
                        },
                        headerTintColor: '#8a78c9',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        },
                    }}
                />
                <Stack.Screen
                    name='TableScreen'
                    component={TableScreen}
                    options={{ title: 'All racers page' }}
                />
                <Stack.Screen
                    name='RacerScreen'
                    component={RacerScreen}
                    options={{ title: 'Racer page' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default App
