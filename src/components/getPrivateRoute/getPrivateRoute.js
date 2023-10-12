import React from "react"
import { Navigate, Route } from "react-router-dom"


 function PrivateRoute ({ children }) {
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
                    <div className="grid pr-2 pr-4">
                        <section className="col-11 pt-4">
                            {Component}
                        </section>
                    </div>
                </PrivateRoute>} 
        />
    )
}

export default getPrivateRoute