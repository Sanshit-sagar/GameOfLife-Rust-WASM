import React, { useState } from 'react'
import Life from './Life'

const Fps = () => {
    const [prevPerfTime, setPrevPerfTime] = useState(0)

    // const handlePerfTimeUpdate = (updatedPerfTime: number) => {
    //     setPrevPerfTime(updatedPerfTime)
    // }

    return (
        <Life prevPerfTime={prevPerfTime} handlePerfTimeUpdate={(updatedPerfTime: number) => setPrevPerfTime(updatedPerfTime)} />
    )
}

export default Fps;