// apps/packages/design-system/src/components/SelectableChip/SelectableChips.tsx

import React from 'react'
import { Pressable, Text } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'

interface Props {
    label: string
    subLabel?: string
    selected: boolean
    onPress: () => void
}

export const SelectableChip = ({
    label,
    subLabel,
    selected,
    onPress,
}: Props) => {
    const theme = useTheme()
    const isNeo = theme.preset === 'neo'
    const displayLabel = isNeo ? label.toUpperCase() : label


    return (
        <Pressable
            onPress={onPress}
            style={{
                padding: theme.spacing.sm,
                borderRadius: isNeo ? 0 : theme.layout.borderRadius,
                borderWidth: theme.layout.borderWidth,
                borderColor: theme.colors.border,
                backgroundColor: selected
                    ? theme.colors.primary
                    : theme.colors.surface,
                shadowColor: isNeo ? '#000' : theme.shadow.shadowColor,
                shadowOffset: isNeo ? { width: 5, height: 5 } : theme.shadow.shadowOffset,
                shadowOpacity: isNeo ? 1 : theme.shadow.shadowOpacity,
                shadowRadius: isNeo ? 0 : theme.shadow.shadowRadius,

            }}
        >
            <Text
                style={{
                    color: selected ? '#fff' : theme.colors.text,
                    fontWeight: isNeo ? '800' : '600',
                    letterSpacing: isNeo ? 1.2 : 0,
                }}
            >
                {displayLabel}
            </Text>

            {subLabel && (
                <Text
                    style={{
                        fontSize: theme.typography.sizes.sm,
                        color: selected ? '#fff' : theme.colors.mutedText,
                    }}
                >
                    {subLabel}
                </Text>
            )}
        </Pressable>
    )
}
