import React from "react"
import { Route } from "react-router"


const getDefaultRoute = (key: number, path: string, Component: any ) => {
    return (
        <Route key={key} path={path} element={Component}/>
    )
}

export default getDefaultRoute