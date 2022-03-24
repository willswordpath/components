import style from './test.scss'
style;

import React from 'react'
import { render } from 'react-dom'
import { App } from 'components/test/app'
import { HashRouter } from 'react-router-dom'

render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('root')
)