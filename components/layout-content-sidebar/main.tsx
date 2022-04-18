import style from './main.scss'
import React from 'react'
import { Welcome } from '../content-welcome'
import classNames from 'classnames'

export function Main() {
    return <main className={classNames(style.main)}>

        <div className={classNames(style.sidebar)}>
        </div>

        <div className={classNames(style.content)}>
            <Welcome />
        </div>
    </main>
}
