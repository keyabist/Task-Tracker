import React from 'react'

const Button = ({ bgColor, textColor, text, onClick }) => {
    return (
        <button
            className='buttons'
            style={{ background: bgColor, color: textColor }}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button
