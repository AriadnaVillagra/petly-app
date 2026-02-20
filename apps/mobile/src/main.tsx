//main.tsx

import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import { store } from './app/store'
import { RootNavigator } from './app/navigation/RootNavigator'
import { ThemeProvider } from '../../../packages/design-system/src/theme/ThemeProvider'
import { BrandConfig } from '../../../packages/design-system/src/theme/AppTheme'

//es un mock, luego esto va a venir directamente desde el backend, el admin user lo va a elegir
const brandMock: BrandConfig = {
  primary: '#FF3B3B',
  secondary: '#FFD60A',
}

export default function Main() {
  return (
    <Provider store={store}>
      <ThemeProvider brand={brandMock}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}
