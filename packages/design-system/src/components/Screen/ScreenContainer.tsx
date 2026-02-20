//  apps/packages/design-system/src/components/Screen/ScreenContainer.tsx

import React from 'react'
import {
  View,
  ImageBackground,
  StyleSheet,
  ViewProps,
} from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'

interface Props extends ViewProps {
  children: React.ReactNode
}

export const ScreenContainer = ({ children, style, ...rest }: Props) => {
  const theme = useTheme()

  if (theme.brand.backgroundImageUrl) {
    return (
      <ImageBackground
        source={{ uri: theme.brand.backgroundImageUrl }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={[styles.overlay, style]} {...rest}>
          {children}
        </View>
      </ImageBackground>
    )
  }

  return (
    <View
      style={[
        styles.background,
        { backgroundColor: theme.colors.background },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
})
