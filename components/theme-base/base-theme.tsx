import style from './base-theme.scss'
import { circularFont } from './circular-font';

import React from 'react';
import classNames from 'classnames';
import type { BaseThemeSchema } from './base-theme-schema';
import { baseThemeDefaults } from './base-theme-defaults';
import { createTheme } from '../theme-context'
import type { ThemeProviderProps } from '../theme-context'

export type BaseThemeProps = ThemeProviderProps<BaseThemeSchema>

const { useTheme, ThemeProvider } = createTheme<BaseThemeSchema>({ defaults: baseThemeDefaults })

/**
 * a wrapper div element that provide font, css variables to be inherited and react context
 */
export function BaseTheme({ children, className, ...props }: BaseThemeProps) {
    return <ThemeProvider className={classNames(circularFont, style.theme, className)} {...props}>
        {/* TODO: Google Fonts */}
        {/* <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet" /> */}
        {children}
    </ThemeProvider>
}

export { useTheme }