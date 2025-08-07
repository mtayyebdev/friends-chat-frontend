import React from 'react'

function Button({
    value,
    extraClass = "",
    onClick,
    size = "sm",
    ...props
}) {
    const allSizes = {
        sm: "text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white",
        lg: "text-base px-5 py-1.5 font-semibold bg-blue-600 hover:bg-blue-700 rounded text-white",
        xl: "text-lg px-6 py-2 font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg text-white",
        full: "text-base px-7 py-2 font-semibold bg-blue-600 hover:bg-blue-700 rounded-full text-white"
    }
    const sizeClass = allSizes[size] || allSizes.sm

    return (
        <button
            className={`${sizeClass} ${extraClass} cursor-pointer`}
            onClick={onClick}
            {...props}
        >
            {value}
        </button>
    )
}

export default Button