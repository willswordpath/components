import style from './test.scss'
import * as React from 'react'
import { render } from 'react-dom'
import { App } from './app'
import { HashRouter } from 'react-router-dom'

render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('root')
)