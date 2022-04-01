import React from 'react'
import { Switch as RouteSwitch, Route } from 'react-router-dom'
// import { ThemeSwitcher } from '@teambit/design.themes.theme-toggler';
import { Header } from '../block-header'
import { WideColumn } from '../page-column'
import { Footer } from '@teambit/wiki.blocks.footer'
import { Wiki } from '@teambit/wiki.sections.wiki'
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

                <Footer />
            </WideColumn>



            {/* <RouteSwitch>

                <Route path="/wiki">
                    <h1 className={classNames(style.trans)}>Wiki</h1>
                </Route>
                <Route path="/people">
                    <h1 className={classNames(style.trans)}>People of React and TypeScript</h1>
                </Route>

                <Route path="/">
                    <h1 className={classNames(style.trans)}>My Components</h1>
                    <Switch></Switch>
                </Route>
            </RouteSwitch> */}

        </ThemeSwitch>

    )
}
