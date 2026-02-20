import React from 'react'
import { View, Modal } from 'react-native'
import { useTheme } from '../../theme/ThemeProvider'


interface Props {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

export const ModalCard = ({ visible, onClose, children }: Props) => {
  const theme = useTheme()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            padding: theme.spacing.lg,
            borderRadius: theme.layout.borderRadius,
            borderWidth: theme.layout.borderWidth,
            borderColor: theme.colors.border,
            width: '80%',
            maxHeight: '70%',
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  )
}
