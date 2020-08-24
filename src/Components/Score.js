import React, { useState, useEffect } from 'react'
import './Score.css'



function Score({ score, usuarios }) {
    const [color, setColor] = useState(null)
    useEffect(() => {
        if (score >= 7) {
            setColor('#6c3')
        }
        else if ((score < 7) && (score >= 5)) {
            setColor('#fc3')

        }
        else {
            setColor('#ed1c24')
        }
        return
    }, [score])
    const goIntegrer = (int) => {
        if (Number.isInteger(int) && (int < 10)) {
            return `${int}.0`
        }
        else {
            return int
        }
    }
    return (
        <div className='score' style={{ backgroundColor: color }}>
            <h2>{goIntegrer(score)}</h2>
            {usuarios && (
                <></>
            )}

        </div>
    )
}

export default Score
