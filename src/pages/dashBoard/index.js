import React from 'react';
import Nav from '../../components/nav/'
import Cards from '../../components/cards/'

import './style.css';

function App() {
    return (
        <>
            <Nav />
            <div className='containerMain'>
                <Cards />
            </div>
        </>
    );
}

export default App;
