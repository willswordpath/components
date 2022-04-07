import style from './primary-links.scss'

import React from 'react'
import classNames from 'classnames'
import { TabLink } from '../../navig-tab-link'
import { classes } from '@teambit/design.ui.surfaces.menu.item'
import { Icon } from '@teambit/design.elements.icon'

import type { SidebarTreeNode } from '../sidebar-section'

export function PrimaryLinks({ links }: { links: SidebarTreeNode }) {
    const linkArr = links?.children
    if (!linkArr || linkArr.length === 0) return null
    return (
        <div className={style.primaryLinks}>
            {linkArr.map((link) => {
                // TODO: oded fix that
                const icon = typeof link.payload?.icon === 'string' ? link.payload?.icon : undefined
                const href = link.payload?.path

                // TODO - use @teambit/design.ui.surfaces.menu.link-item when it uses the new navigation system
                return (
                    <TabLink
                        key={link.id}
                        // TODO
                        to={href || '/'}
                        className={classNames(classes.menuItem, !!href && classes.interactive)}
                        activeClassName={classes.active}
                        exact
                    >
                        {icon && <Icon of={icon} className={classes.icon} />}
                        {link.payload?.title}
                    </TabLink>
                )
            })}
        </div>
    )
}
