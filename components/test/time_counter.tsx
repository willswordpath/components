import React, { useEffect, useState } from 'react'
export function TimeCounter() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setCount(count => (count + 1))
        }, 100)
    }, [])
    return <div data-testid="timer">{count}</div>
}
