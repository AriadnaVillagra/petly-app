// src/theme/AppTheme.ts

export type StylePresetType = 'neo' | 'soft' | 'minimal'

export interface BrandConfig {
  primary: string
  secondary: string
  accent?: string
  logoUrl?: string
  backgroundImageUrl?: string
}

export interface AppTheme {
  preset: StylePresetType

  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    mutedText: string
    border: string
    success: string
    error: string
  }

  layout: {
    borderRadius: number
    borderWidth: number
    spacingUnit: number
  }

  shadow: {
    elevation: number      // Android
    shadowColor: string    // iOS
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
  }

  typography: {
    fontFamily: string
    sizes: {
      sm: number
      md: number
      lg: number
      xl: number
    }
  }

  brand: {
    logoUrl?: string
    backgroundImageUrl?: string
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
}
