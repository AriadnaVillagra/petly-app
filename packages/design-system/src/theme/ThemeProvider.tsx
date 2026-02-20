import React, { createContext, useContext, useMemo } from 'react'
import { AppTheme, BrandConfig, StylePresetType } from './AppTheme'
import { createTheme } from './createTheme'

const ThemeContext = createContext<AppTheme | null>(null)

interface Props {
  brand: BrandConfig
  preset?: StylePresetType // ← ahora es opcional
  children: React.ReactNode
}

export const ThemeProvider = ({
  brand,
  preset = 'neo', // ← default real del sistema
  children,
}: Props) => {
  const theme = useMemo(
    () => createTheme(brand, preset),
    [brand, preset]
  )

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return context
}
