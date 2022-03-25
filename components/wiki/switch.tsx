import React from "react"
import { useThemeSwitch } from "../theme-switch"
import { useTheme } from '../theme-base'
import style from './trans.scss'
import classNames from 'classnames'

export function Switch() {
    const swd = useThemeSwitch()
    const list = swd?.options || []
    const thme = useTheme()

    return <>
        {
            list.map((x, index) => <div key={index} onClick={() => {
                swd?.setTheme(x)
            }}>
                <h2 className={classNames(style.trans)} style={{
                    background: thme.backgroundColor
                }}>{x.themeName}</h2>
            </div>)
        }
    </>
}