import React, { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'
import type { MDXProviderComponents } from '@teambit/mdx.ui.mdx-layout'
import { h1 as H1, h2 as H2, h3 as H3 } from '@teambit/documenter.markdown.heading'
import { Link } from '@teambit/design.ui.navigation.link'

const getTextLink = (element: ReactNode) =>
    typeof element === 'string' ? element.trim().toLowerCase().replace(/ /g, '-') : undefined

export const mdxComponents = (baseUrl: string, selectorClassName?: string): MDXProviderComponents => {
    return {
        h1: ({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
            <H1 className={classNames(selectorClassName, className)} link={getTextLink(children)} {...rest}>
                {children}
            </H1>
        ),
        h2: ({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
            <H2 className={classNames(selectorClassName, className)} link={getTextLink(children)} {...rest}>
                {children}
            </H2>
        ),
        h3: ({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
            <H3 className={classNames(selectorClassName, className)} link={getTextLink(children)} {...rest}>
                {children}
            </H3>
        ),
        a: ({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
            const isExternal = href?.startsWith('http') ? true : undefined
            return <Link href={isExternal ? href : `${baseUrl}${href}`} external={isExternal} {...rest} />
        },
    }
}
