import React from 'react'

function InputBox({
    value,
    setValue,
    type = "text",
    placeholder,
    required = false,
    extraClass,
    id
}) {
    return (
        <>
            <input type={type} value={value} id={id} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} required={required} className={`${extraClass} px-3 py-2 outline-hidden focus:ring-2 focus:ring-blue-500 rounded w-full border border-gray-300 dark:border-gray-500 text-black dark:text-white placeholder:text-slate-500 text-base`} />
        </>
    )
}

export default InputBox