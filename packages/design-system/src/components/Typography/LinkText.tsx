import React from 'react'
import { Pressable } from 'react-native'
import { Typography } from './Typography'
import { useTheme } from '../../theme/ThemeProvider'

interface Props {
  children: React.ReactNode
  onPress?: () => void
}

export const LinkText = ({ children, onPress }: Props) => {
  const theme = useTheme()

  return (
    <Pressable onPress={onPress}>
      <Typography
        style={{
          color: theme.colors.primary,
          textAlign: 'center',
        }}
      >
        {children}
      </Typography>
    </Pressable>
  )
}
