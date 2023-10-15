import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"

import { auth } from '../../service/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'

import { Navigate } from 'react-router-dom'

import Nav from '../nav'

function PrivateRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            onAuthStateChanged(auth, (user) => {
                //se tem user logado
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoading(false);
                    setSigned(true);

                } else {
                    //nao possui user logado
                    setLoading(false);
                    setSigned(false);
                }
            })
        }

        checkLogin();
    }, [])

    if (loading) {
        return (
            <div></div>
        )
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children;
}

const getPrivateRoute = (index, path, Component) => {
    return (
        <Route
            key={index}
            path={path}
            element={
                <PrivateRoute>
                    <Nav />
                    {Component}
                </PrivateRoute>}
        />
    )
}

export default getPrivateRoute