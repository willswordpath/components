import style from './doc-page.scss'
import React, { useRef, useEffect, ReactNode, Suspense, MutableRefObject } from 'react'

import { MDXLayout } from '@teambit/mdx.ui.mdx-layout'
import { Page } from '@teambit/base-react.pages.page'

import type { DocsPlugin } from '../plugin-docs'
import type { Route } from '../route-docs'

import { docPageContext } from './doc-page-context'
import { mdxComponents } from './mdx-components'

export type DocPageProps = {
    /**
     * a text to be rendered in the component.
     */
    children: ReactNode;

    /**
     * current route.
     */
    route: Route;

    /**
     * current key.
     */
    index: number;

    plugins?: DocsPlugin[];
};

const components = mdxComponents('/docs', 'docs-heading')
const scrollToRef = (ref: MutableRefObject<HTMLElement | null>) => {
    if (typeof window === 'undefined' || !ref.current) return

    window.scrollTo(0, -ref.current.offsetTop)
}

export function DocPage({ route, index, children, plugins = [] }: DocPageProps) {
    const myRef = useRef(null)
    const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>

    const pageDescription = route.description || `Documentation page for ${route.title} - Bit.`

    useEffect(() => {
        scrollToRef(myRef)
    }, [contentRef.current])
    // @TODO @josh remove when ssr is working
    useEffect(() => {
        if (window?.location.hash) {
            setTimeout(() => {
                const element = document.getElementById(window.location.hash.replace('#', ''))
                element?.scrollIntoView()
            }, 500)
        }
    }, [window?.location.hash])

    return (
        <Page title={`${route.title} | Bit`} description={pageDescription} className={style.docsPage}>
            <Suspense fallback={<div />}>
                <docPageContext.Provider value={{ index, route }}>
                    <div ref={myRef} id="content" className={style.content}>
                        <MDXLayout components={components}>
                            <div className={style.mdxLayout} ref={contentRef}>
                                {children}
                            </div>
                        </MDXLayout>

                        {plugins.map((plugin) => {
                            return plugin.page.bottom?.flatMap((Plugin) => {
                                return <Plugin {...route.plugins[plugin.name]} key={plugin.name} contentRef={contentRef} />
                            })
                        })}
                    </div>
                    {plugins.map((plugin) => {
                        return plugin.page.right?.flatMap((Plugin) => {
                            return <Plugin {...route.plugins[plugin.name]} key={plugin.name} contentRef={contentRef} />
                        })
                    })}
                </docPageContext.Provider>
            </Suspense>
        </Page>
    )
}
