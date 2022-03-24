import React from 'react'
import { Routes, Route } from 'react-router-dom'

export function App() {
    return <Routes>
        <Route path='/' element={<h1>Components</h1>} />
        <Route path='/test' element={<h1>Test Route</h1>} />
    </Routes>
}