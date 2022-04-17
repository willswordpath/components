import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { TimeCounter } from './time_counter'

let container: HTMLDivElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
})

jest.useFakeTimers()

it('renders correct time count', () => {
    act(() => {
        render(<TimeCounter />, container)
    })
    const timerDiv = container.querySelector('[data-testid="timer"]')
    expect(timerDiv?.textContent).toBe('0')
    act(() => {
        jest.advanceTimersByTime(99)
    })
    expect(timerDiv?.textContent).toBe('0')
    act(() => {
        jest.advanceTimersByTime(1)
    })
    expect(timerDiv?.textContent).toBe('1')
    act(() => {
        jest.advanceTimersByTime(99)
    })
    expect(timerDiv?.textContent).toBe('1')
    act(() => {
        jest.advanceTimersByTime(1)
    })
    expect(timerDiv?.textContent).toBe('2')
})
