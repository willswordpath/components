import style from './base-theme.scss'
import { circularFont } from './circular-font'

import React from 'react'
import classNames from 'classnames'
import type { BaseThemeSchema } from './base-theme-schema'
import { baseThemeDefaults } from './base-theme-defaults'
import { createTheme } from '../theme-context'
import type { ThemeProviderProps } from '../theme-context'

export interface BaseThemeProps extends ThemeProviderProps<BaseThemeSchema> {
    innerRef: React.RefObject<HTMLDivElement>
}

const { useTheme, ThemeProvider } = createTheme<BaseThemeSchema>({ defaults: baseThemeDefaults })

/**
 * a wrapper div element that provide font, css variables to be inherited and react context
 */
export function BaseTheme({ children, className, innerRef, ...props }: BaseThemeProps) {
    return <ThemeProvider innerRef={innerRef} className={classNames(circularFont, style.theme, className)} {...props}>
        {/* TODO: Google Fonts */}
        {/* <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet" /> */}
        {children}
    </ThemeProvider>
}

export { useTheme }
