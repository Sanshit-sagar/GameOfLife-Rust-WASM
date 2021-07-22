import React, { useState } from 'react'
import Life from './Life'

type PerfTime = {
    prevPerfTime: number, 
    handlePerfTimeUpdate: React.EventHandler<React.SyntheticEvent<number, Event>>,
};

const Fps = () => {
    const [prevPerfTime, setPrevPerfTime] = useState(0)

    const handlePerfTimeUpdate = (updatedPerfTime: number) => {
        setPrevPerfTime(updatedPerfTime)
    }

    return (
        <Life prevPerfTime={prevPerfTime} handlePerfTimeUpdate={handlePerfTimeUpdate} />
    )
}