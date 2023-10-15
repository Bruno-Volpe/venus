import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"

import getDefaultRoute from "../components/getdefaultroute/getDefaultRoute"
import { InterfaceRoute, InterfaceRoutes } from "./interfaces"
import getPrivateRoute from "../components/getPrivateRoute/getPrivateRoute"

import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'


const defaultRoutes: InterfaceRoutes = [
    {path: '/login', component: <Home />},
]


const privateRoutes: InterfaceRoutes = [
    {path: '/', component: <Home />},
    {path: 'storeNewSubject/', component: <Home />},
    {path: 'storeGrades/:id', component: <Home />},
    {path: 'cardDetails/:id', component: <Home />},
]



const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {defaultRoutes.map((item: InterfaceRoute, index: number) => getDefaultRoute(index, item.path, item.component))}
                {privateRoutes.map((item: InterfaceRoute, index: number) => getPrivateRoute(index, item.path, item.component))}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App