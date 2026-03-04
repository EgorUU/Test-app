'use client'
import React, { useEffect, useState } from 'react'
import "@/scss/blocks/header.scss"

const Header: React.FC = () => {
    const [timerMinutes, setTimerMinutes] = useState(2)
    const [timerSeconds, setTimerSeconds] = useState(0)
    const [timeActive, setTimeActive] = useState(false)
    const [timeEnd2, setTimeEnd2] = useState(false)

    useEffect(() => {
        const time = setInterval(() => {
            setTimerSeconds(prev => prev - 1)
        }, 1000)

        return () => clearInterval(time)
    }, [])

    useEffect(() => {
        if (timerSeconds < 0 && timerMinutes > 0) {
            setTimerSeconds(59)
            setTimerMinutes(prev => prev - 1)
        }
        
        if (timerSeconds === 0 && timerMinutes === 0) {
            setTimeEnd2(true)
        }
        
        if (timerSeconds === 30 && timerMinutes === 0) {
            setTimeActive(true)
        }
    }, [timerSeconds, timerMinutes])

    useEffect(() => {
        if (timeEnd2) {
            setTimerSeconds(0)
            setTimerMinutes(0)
        }
    }, [timeEnd2])

    return (
        <header className='header flex flex-col justify-center items-center'>
            <h1 className='header-main'>
                Успейте открыть пробную неделю
            </h1>
            <h1 
                className='header-timer' 
                style={{
                    animation: timeActive ? "Time 1s ease-in-out" : "", 
                    color: timeEnd2 ? "#fff" : "#FFBB00"
                }}
            >
                <span>+</span> 
                {timeEnd2 ? "00 : 00" : `${timerMinutes.toString().padStart(2, '0')} : ${timerSeconds.toString().padStart(2, '0')}`} 
                <span>+</span>
            </h1>
        </header>
    )
}

export default Header