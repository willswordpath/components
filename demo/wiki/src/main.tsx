import style from './test.scss'
style;

import React from 'react'
import { render } from 'react-dom'
import { WikiApp } from 'components/wiki'
import { HashRouter } from 'react-router-dom'

render(
    <HashRouter>
        <WikiApp />
    </HashRouter>
    , document.getElementById('root')
)