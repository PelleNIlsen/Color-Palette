import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import GeneratePage from './pages/GeneratePage';
import ColorSpecsPage from './pages/ColorSpecsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<WelcomePage />} />
                <Route path='/generate/:palette?' element={<GeneratePage />} />
                <Route path='/color-specs/:colorHex' element={<ColorSpecsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
