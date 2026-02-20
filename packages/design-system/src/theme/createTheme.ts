// src/theme/createTheme.ts

import { AppTheme, BrandConfig, StylePresetType } from './AppTheme'
import { neoPreset } from './presets/neo'
import { softPreset } from './presets/soft'
import { minimalPreset } from './presets/minimal'

const baseColors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#000000',
  mutedText: '#333333',
  border: '#000000',
  success: '#00C853',
  error: '#D50000',
}

const presetMap = {
  neo: neoPreset,
  soft: softPreset,
  minimal: minimalPreset,
}

export function createTheme(
  brand: BrandConfig,
  preset: StylePresetType
): AppTheme {
  const selectedPreset = presetMap[preset]

  return {
    preset,

    colors: {
      primary: brand.primary,
      secondary: brand.secondary,
      accent: brand.accent ?? brand.secondary,
      ...baseColors,
    },

    layout: selectedPreset.layout!,
    shadow: selectedPreset.shadow!,
    typography: selectedPreset.typography!,

    brand: {
      logoUrl: brand.logoUrl,
      backgroundImageUrl: brand.backgroundImageUrl,
    },

    spacing: {
      xs: selectedPreset.layout!.spacingUnit * 0.5,
      sm: selectedPreset.layout!.spacingUnit,
      md: selectedPreset.layout!.spacingUnit * 2,
      lg: selectedPreset.layout!.spacingUnit * 3,
      xl: selectedPreset.layout!.spacingUnit * 4,
    },
  }
}
