import React from 'react'
import { Text, TextProps } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'

interface Props extends TextProps {
  variant?: 'body' | 'title' | 'caption'
  children: React.ReactNode
}

export const Typography = ({
  variant = 'body',
  style,
  children,
  ...rest
}: Props) => {
  const theme = useTheme()

  const getFontSize = () => {
    switch (variant) {
      case 'title':
        return theme.typography.sizes.lg
      case 'caption':
        return theme.typography.sizes.sm
      default:
        return theme.typography.sizes.md
    }
  }

  return (
    <Text
      style={[
        {
          color: theme.colors.text,
          fontSize: getFontSize(),
          fontFamily: theme.typography.fontFamily,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  )
}
