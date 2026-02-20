import React from 'react'
import { Pressable, ViewProps } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'

interface Props extends ViewProps {
  children: React.ReactNode
  interactive?: boolean
}

export const Card = ({
  children,
  style,
  interactive = false,
  ...rest
}: Props) => {
  const theme = useTheme()
  const isNeo = theme.preset === 'neo'

  return (
    <Pressable
      disabled={!interactive}
      style={({ pressed }) => [
        {
          backgroundColor: theme.colors.surface,
          borderRadius: isNeo ? 0 : theme.layout.borderRadius,
          borderWidth: theme.layout.borderWidth,
          borderColor: theme.colors.border,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.md,

          shadowColor: isNeo ? '#000' : theme.shadow.shadowColor,
          shadowOffset: isNeo
            ? { width: 6, height: 6 }
            : theme.shadow.shadowOffset,
          shadowOpacity: isNeo ? 1 : theme.shadow.shadowOpacity,
          shadowRadius: isNeo ? 0 : theme.shadow.shadowRadius,
          elevation: theme.shadow.elevation,

          transform:
            isNeo && interactive && pressed
              ? [{ translateX: 6 }, { translateY: 6 },  { scale: 0.98 },]
              : [],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  )
}
