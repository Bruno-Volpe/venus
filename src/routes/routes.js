import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoutes';

import Login from '../pages/login/';
import DashBoard from '../pages/dashBoard/';
import StoreNewSubject from '../pages/storeNewSubject/';
import NotFound from '../pages/error/';
import CardDetails from '../pages/CardDetails';
import ConfigureGrade from '../pages/configureSubject'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/login" element={<Login />} />

                <Route index path='/' element={<PrivateRoute> <DashBoard /> </PrivateRoute>} />
                <Route index path='/storeNewSubject' element={<PrivateRoute> <StoreNewSubject /> </PrivateRoute>} />
                <Route index path='/storeGrades/:id' element={<PrivateRoute> <ConfigureGrade /> </PrivateRoute>} />
                <Route index path='/cardDetails/:id' element={<PrivateRoute> <CardDetails /> </PrivateRoute>} />

                <Route path='*' element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

