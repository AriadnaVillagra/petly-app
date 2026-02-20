// petly/packages/design-system/src/components/Layout/Section.tsx

import React from 'react'
import { Stack } from './Stack'
import { Typography } from '../Typography/Typography'

interface SectionProps {
  title: string
  children: React.ReactNode
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <Stack spacing="sm">
      <Typography variant="title">
        {title}
      </Typography>
      {children}
    </Stack>
  )
}
