import React from 'react'
import { View, ViewProps } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'

interface Props extends ViewProps {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  direction?: 'column' | 'row'
  wrap?: boolean
  children: React.ReactNode
}

export const Stack = ({
  spacing = 'md',
  direction = 'column',
  wrap = false,
  style,
  children,
  ...rest
}: Props) => {
  const theme = useTheme()

  return (
    <View
      style={[
        {
          flexDirection: direction,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          gap: theme.spacing[spacing],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}
