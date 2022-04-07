import style from './docs.scss'
import React, { useMemo } from 'react'
import classNames from 'classnames'
import { Switch, Route } from 'react-router-dom'

import { NotFound } from '@teambit/community.ui.pages.errors.not-found'

import { DocsRoute, DocsRoutes } from '../route-docs'
import { Sidebar } from '../block-sidebar'
import { DocPage } from '../ui-doc-page'
import { DocsPlugin } from '../plugin-docs'

import { DocsContext } from './docs-context'

export interface ContentCategory {
    /**
     * a title for the content category.
     */
    title?: string;

    /**
     * a routes to be rendered in the content sidebar.
     */
    routes: DocsRoute[];

    /**
     * a className to pass styling to the sidebar.
     */
    className?: string;
}

export interface DocsProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * USE_MEMO
     * an array of routes category.
     */
    contents?: ContentCategory[];

    /**
     * base URL for the docs route.
     */
    baseUrl?: string;

    /**
     * USE_MEMO
     * primary links to be presented in the top of the sidebar.
     */
    primaryLinks?: DocsRoute[];

    /**
     * array doc plugins to compose.
     */
    plugins?: DocsPlugin[];
}

const defaultPrimaryLinks: DocsRoute[] = []

export function Docs({ contents, primaryLinks = defaultPrimaryLinks, baseUrl, plugins = [], className, ...rest }: DocsProps) {

    const {
        primaryRoutes,
        contentRoutes,
        routeArray
    } = useMemo(() => {
        const primaryRoutes = DocsRoutes.from(primaryLinks, baseUrl)

        const contentRoutes = contents?.map((category) => {
            return {
                title: category.title,
                routes: DocsRoutes.from(category.routes || [], baseUrl),
                className: category.className,
            }
        })

        const pRoutes = primaryRoutes.getRoutes()
        const cRoutes = contentRoutes?.map((category) => category.routes.getRoutes()) || []
        const routeArray = pRoutes.concat(...cRoutes)

        return {
            primaryRoutes,
            contentRoutes,
            routeArray
        }
    }, [primaryLinks, baseUrl, contents])

    return (
        <DocsContext.Provider
            value={{
                contentRoutes: contentRoutes?.map((category) => category.routes),
                primaryRoutes,
                routes: routeArray,
                plugins,
            }}
        >
            <div {...rest} className={classNames(style.main, className)}>

                <Sidebar primaryLinks={primaryRoutes.toSideBarTree()} sections={contentRoutes} />

                <div className={style.content}>
                    <Switch>
                        {routeArray.map((route, key) => {
                            return (
                                <Route
                                    key={route.absPath}
                                    path={route.path}
                                >
                                    <DocPage index={key} route={route} plugins={plugins}>
                                        {route.component}
                                    </DocPage>
                                </Route>
                            )
                        })}

                        {/* default catch all */}
                        <Route path="*">
                            <NotFound />
                        </Route>

                    </Switch>
                </div>

            </div>
        </DocsContext.Provider>
    )
}
