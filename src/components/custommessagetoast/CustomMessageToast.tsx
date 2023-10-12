import React from "react"


interface CustomMessageInteface {
    title: string,
    bodyMsg: string
}


function CustomMessage({ title, bodyMsg }: CustomMessageInteface) {
    return (
        <div>
            <h2 className="mb-2">{title}</h2>
            <p>{bodyMsg}</p>
        </div>
    )
}

export default CustomMessage