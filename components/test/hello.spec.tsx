import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Hello from './hello'
import type { HelloProps } from './hello'

let container: HTMLDivElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
})

it('renders stranger when no param-<name> is provided', () => {
    act(() => {
        render(<Hello />, container)
    })
    expect(container.textContent).toBe('Hey, stranger')
})

it('renders name when param-<name> is provided', () => {
    act(() => {
        render(<Hello name='JavaScript' />, container)
    })
    expect(container.textContent).toBe('Hello, JavaScript!')

    act(() => {
        render(<Hello name='Kate' />, container)
    })
    expect(container.textContent).toBe('Hello, Kate!')

    act(() => {
        render(<Hello name='Jason' />, container)
    })
    expect(container.textContent).toBe('Hello, Jason!')
})
