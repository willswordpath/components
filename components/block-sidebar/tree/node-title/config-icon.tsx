import style from './node-title.scss'
import React from 'react'
import { Icon } from '@teambit/design.elements.icon'
import { NavLink } from '@teambit/design.ui.navigation.link'

export function ConfigIcon({ configPath }: { configPath: string | undefined }) {
    if (!configPath) return null
    return (
        <NavLink
            href={configPath}
            className={style.configLink}
            activeClassName={style.active}
            // This prevent open/close when clicking on the icon.
            onClick={(e) => e.stopPropagation()}
            exact
        >
            <Icon className={style.configIcon} of="settings" />
        </NavLink>
    )
}
