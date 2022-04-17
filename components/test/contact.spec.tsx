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

it('match the snapshot', () => {
    act(() => {
        render(
            <Contact id='1234' name='John' email='john@gmail.com' site='www.exper.com'></Contact>
            , container
        )
    })
    expect(container.innerHTML).toMatchInlineSnapshot(`
<div>
  <address>
    Contact John via
    <a data-testid="email"
       href="mailto:john@gmail.com"
    >
      email
    </a>
    or on their
    <a data-testid="site"
       href="www.exper.com"
    >
      website
    </a>
    .
  </address>
  <h1 data-testid="user-data">
    1234
  </h1>
</div>
`)
})
