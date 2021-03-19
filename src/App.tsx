import 'react-native-gesture-handler'

import React from 'react'
import { View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AppProvider from './hooks'

import Routes from './routes'
import colors from './utils/styles/colors'

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor={colors.GRAY_SECONDARY} translucent />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: colors.GRAY_SECONDARY }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
)

export default App
