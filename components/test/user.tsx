import React, { useState, useEffect } from 'react'

export interface UserData {
    name: string
    age: number
    address: string
}

export function User({ id }: { id: string }) {
    const [user, setUser] = useState(undefined as UserData | undefined)
    async function fetchUserData(id: string) {
        const proResponseJson = (await fetch('/' + id)).json()
        setUser(await proResponseJson)
    }
    useEffect(() => {
        fetchUserData(id)
    }, [id])
    if (!user)
        return <p>
            {'loading...'}
        </p>
    else
        return <details>
            <summary>{user.name}</summary>
            <strong>{user.age}</strong> years old
            <br />
            lives in {user.address}
        </details>
}
