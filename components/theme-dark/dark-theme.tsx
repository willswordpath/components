import React from 'react'
import type { ThemeOption, ThemeName } from '../theme-switch'
import { BaseTheme } from '../theme-base'
import type { BaseThemeProps } from '../theme-base'
import { darkThemeOverride } from './dark-override'

const compon = (props: BaseThemeProps) => {
    return <BaseTheme {...props} override={darkThemeOverride} />
}
const dark: ThemeName = 'dark'
compon.themeName = dark

export const DarkTheme: ThemeOption = compon