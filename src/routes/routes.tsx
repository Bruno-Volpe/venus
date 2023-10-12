import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Provider } from 'react-redux'
import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'
import getDefaultRoute from "../components/getdefaultroute/getDefaultRoute"
import { InterfaceRoute, InterfaceRoutes } from "./interfaces"
import getPrivateRoute from "../components/getPrivateRoute/getPrivateRoute"
import 'primereact/resources/themes/luna-green/theme.css'





const defaultRoutes: InterfaceRoutes = [
    {path: '/', component: <Home />},
]


const privateRoutes: InterfaceRoutes = [
    // {path: FULL_ROUTES_ENUM.DEFAULT.HOME, component: <Home />},
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