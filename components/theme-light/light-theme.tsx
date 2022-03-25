import React from 'react'
import type { ThemeOption, ThemeName } from '../theme-switch'
import { BaseTheme } from '../theme-base'
import type { BaseThemeProps } from '../theme-base'

const compon = (props: BaseThemeProps) => {
    return <BaseTheme {...props} />
}
const light: ThemeName = 'light'
compon.themeName = light

export const LightTheme: ThemeOption = compon