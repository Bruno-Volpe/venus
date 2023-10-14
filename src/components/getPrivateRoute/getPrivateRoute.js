import React from "react"
import { Navigate, Route } from "react-router-dom"


function PrivateRoute({ children }) {
    return (true) ? children : <Navigate
        to={'/login'} />
}


const getPrivateRoute = (index, path, Component) => {
    return (
        <Route
            key={index}
            path={path}
            element={
                <PrivateRoute>

                    {Component}
                </PrivateRoute>}
        />
    )
}

export default getPrivateRoute