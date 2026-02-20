import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'

interface Props extends TextInputProps {}

export const Input = ({ style, ...rest }: Props) => {
  const theme = useTheme()

  return (
    <TextInput
      placeholderTextColor={theme.colors.mutedText}
      style={[
        {
          borderWidth: theme.layout.borderWidth,
          borderColor: theme.colors.border,
          borderRadius: theme.layout.borderRadius,
          padding: theme.spacing.md,
          color: theme.colors.text,
          backgroundColor: theme.colors.surface,
        },
        style,
      ]}
      {...rest}
    />
  )
}
