import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Counter } from './counter'


let container: HTMLDivElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
})

it('renders correct count', () => {
    const onClick = jest.fn()

    act(() => {
        render(<Counter onClick={onClick} />, container)
    })
    const countDiv = container.querySelector('[data-testid="count"]')

    expect(countDiv?.textContent).toBe('0')
    expect(onClick).toHaveBeenCalledTimes(0)

    for (let i = 0; i < 5; i++)
        act(() => {  // for loop can't be put into act block in this case, or react will not re-render correctly due to state changes (callback invoked too fast)
            countDiv?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

    expect(countDiv?.textContent).toBe('5')

    expect(onClick).toHaveBeenCalledTimes(5)

    const ary = []
    for (let i = 1; i <= 5; i++)
        ary.push([i])
    expect(onClick.mock.calls).toEqual(ary)
})
