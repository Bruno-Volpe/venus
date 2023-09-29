import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoutes';

import Login from '../pages/login/';
import DashBoard from '../pages/dashBoard/';
import NotFound from '../pages/error/';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/login" element={<Login />} />

                <Route index path='/' element={<PrivateRoute> <DashBoard /> </PrivateRoute>} />

                <Route path='*' element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

