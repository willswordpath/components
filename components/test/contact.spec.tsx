import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Contact } from './contact'
import { act } from 'react-dom/test-utils'

jest.mock('./user', () => ({
    User: function ({ id }: { id: string }) {
        return <h1 data-testid="user-data">{id}</h1>
    }
}))

let container: HTMLDivElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
})

it('renders contact information', () => {
    act(() => {
        render(
            <Contact id='1234' name='John' email='john@gmail.com' site='www.exper.com'></Contact>
            , container
        )
    })

    expect(
        container.querySelector('[data-testid="email"]')?.getAttribute('href')
    ).toBe('mailto:john@gmail.com')

    expect(
        container.querySelector('[data-testid="site"]')?.getAttribute('href')
    ).toBe('www.exper.com')

    expect(
        container.querySelector('[data-testid="user-data"]')?.textContent
    ).toBe('1234')
})
