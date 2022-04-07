import style from './tab-link.scss'

import React, { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import type { NavLinkProps } from 'react-router-dom'
import classNames from 'classnames'

export interface TabLinkProps extends NavLinkProps {
    activeBorderPosition?: 'top' | 'bottom' | 'left' | 'right' | 'around'
    /**
     * add styling attributes to the rendered element when it matches the current URL
     */
    activeClassName?: string;
    className?: string
    children: ReactNode
}

/**
 * a component used to display a nav link, usually used in headers or tabs to display a specific active ui
 */
export const TabLink = forwardRef<HTMLAnchorElement, TabLinkProps>(
    function TabLink({ className, activeClassName, activeBorderPosition = 'bottom', children, ...restProps }: TabLinkProps, ref) {
        return (
            <NavLink
                data-position={activeBorderPosition}
                className={isActive => classNames(style.tabLink, className,
                    isActive && style.active,
                    isActive && activeClassName
                )}
                {...restProps}
                ref={ref}
            >
                <div>{children}</div>
            </NavLink>
        )
    }
)
