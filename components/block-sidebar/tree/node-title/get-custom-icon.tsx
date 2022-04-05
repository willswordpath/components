import style from './node-title.scss'
import React, { ReactNode } from 'react'
import { Icon } from '@teambit/design.elements.icon'

export function getCustomIcon(icon: string | ReactNode) {
    if (!icon) return null
    if (typeof icon === 'string') {
        if (icon.startsWith('http')) {
            return <img src={icon} className={style.img} alt="" />
        }
        // for icomoon icons
        return <Icon className={style.icon} of={icon} />
    }
    // for custom elements
    return icon
}
