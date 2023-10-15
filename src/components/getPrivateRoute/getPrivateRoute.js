import React from "react"
import { Route } from "react-router-dom"
import PrivateRoute from './PrivateRoute';


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