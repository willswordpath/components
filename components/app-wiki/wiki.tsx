import React from 'react'
import { Switch as RouteSwitch, Route } from 'react-router-dom'
// import { ThemeSwitcher } from '@teambit/design.themes.theme-toggler';
import { Header } from '../block-header'
import { WideColumn } from '../page-column'
import { Footer } from '../block-footer'
import { Wiki } from '../section-wiki'
import { ThemeSwitch } from '../theme-switch'
// import { Switch } from './switch'
// import style from './trans.scss'
// import classNames from 'classnames'


export function WikiApp() {
    return (
        <ThemeSwitch initialTheme="light">

            <Header />

            <WideColumn>

                <RouteSwitch>
                    <Route path="/">
                        <Wiki />
                    </Route>
                </RouteSwitch>

                <Footer>
                    <h1>Test Footer Content</h1>
                </Footer>
            </WideColumn>

        </ThemeSwitch>

    )
}
