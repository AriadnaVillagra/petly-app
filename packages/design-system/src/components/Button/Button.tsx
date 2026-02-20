import React from 'react'
import {
    Pressable,
    Text,
    StyleSheet,
    GestureResponderEvent,
    ViewStyle,
    TextStyle,
} from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'


interface ButtonProps {
    title: string
    onPress: (event: GestureResponderEvent) => void
    variant?: 'primary' | 'secondary'
    style?: ViewStyle
    textStyle?: TextStyle
    disabled?: boolean
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
    disabled = false,
}: ButtonProps) => {
    const theme = useTheme()
    const isNeo = theme.preset === 'neo'

    const backgroundColor =
        variant === 'primary'
            ? theme.colors.primary
            : isNeo
                ? '#FFD60A'
                : theme.colors.surface

    const textColor =
        variant === 'primary'
            ? '#fff'
            : theme.colors.text

    const displayTitle = isNeo
        ? title.toUpperCase()
        : title

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.base,
                {
                    backgroundColor,
                    borderRadius: isNeo ? 0 : theme.layout.borderRadius,
                    borderWidth: theme.layout.borderWidth,
                    borderColor: theme.colors.border,
                    paddingVertical: theme.spacing.sm,
                    paddingHorizontal: theme.spacing.lg,

                    shadowColor: isNeo ? '#000' : theme.shadow.shadowColor,
                    shadowOffset: isNeo
                        ? { width: 6, height: 6 }
                        : theme.shadow.shadowOffset,
                    shadowOpacity: isNeo ? 1 : theme.shadow.shadowOpacity,
                    shadowRadius: isNeo ? 0 : theme.shadow.shadowRadius,
                    elevation: theme.shadow.elevation,

                    opacity: disabled ? 0.5 : 1,

                    transform:
                        isNeo && pressed
                            ? [{ translateX: 6 }, { translateY: 6 }]
                            : [],
                },
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: textColor,
                        fontFamily: theme.typography.fontFamily,
                        fontSize: theme.typography.sizes.md,
                        fontWeight: isNeo ? '800' : '600',
                        letterSpacing: isNeo ? 1.5 : 0,
                    },
                    textStyle,
                ]}
            >
                {displayTitle}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
    },
})
