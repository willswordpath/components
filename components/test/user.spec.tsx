/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { User } from './user'
import type { UserData } from './user'

let container: HTMLDivElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
})

it('renders user data', async () => {
    const fakeUserData: UserData = {
        name: 'John',
        age: 24,
        address: '123, Avenue',
    }
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUserData)
        } as Response)
    )

    await act(async () => {
        render(<User id='123' />, container)
    })
    expect(container.querySelector('summary')?.textContent).toBe(fakeUserData.name)
    expect(container.querySelector('strong')?.textContent).toBe(fakeUserData.age + '')
    expect(container.textContent).toBe('John24 years oldlives in 123, Avenue')

    // @ts-ignore
    delete global.fetch
})
