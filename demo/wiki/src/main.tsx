import React from 'react'
import { render } from 'react-dom'
import { WikiApp } from 'components/app-wiki'
import { BrowserRouter } from 'react-router-dom'

render(
    <BrowserRouter>
        <WikiApp />
    </BrowserRouter>
    , document.getElementById('root')
)
