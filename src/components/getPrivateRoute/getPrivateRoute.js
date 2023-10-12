import React from "react"
import { Navigate, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import FULL_ROUTES_ENUM from "../../routes/full_routes"
import BurgerMenu from "../burguermenu/BurgerMenu"
import { getToken } from "../../services/auth"

 function PrivateRoute ({ children }) {
    const isLogged = useSelector(state => state.coreReducer.isLogged)
    return (!!getToken() && isLogged) ? children : <Navigate 
        to={FULL_ROUTES_ENUM.DEFAULT.LOGIN} />
}


const getPrivateRoute = (index, path, Component) => {
    return (
        <Route 
            key={index}
            path={path} 
            element={
                <PrivateRoute> 
                    <div className="grid pr-2 pr-4">
                        <BurgerMenu />
                        <section className="col-11 pt-4">
                            {Component}
                        </section>
                    </div>
                </PrivateRoute>} 
        />
    )
}

export default getPrivateRoute