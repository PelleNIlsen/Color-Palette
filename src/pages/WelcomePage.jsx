import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600'>
            <h1 className='text-6xl font-bold text-white mb-8 tracking-tight'>
                Color Heaven!
            </h1>
            <p className='text-2xl font-light text-white mb-8'>
                Your go-to place for all things color-related.
            </p>
            <div className='flex space-x-4'>
                <Link to='/generate'>
                    <button className='text-2xl py-3 px-6 bg-white text-black rounded-full hover:bg-gray-100 transition duration-300 ease-in-out focus:ring-4 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-white'>
                        Generate Palettes
                    </button>
                </Link>
                <Link to="/color-specs/f5f5f5">
                    <button className='text-2xl py-3 px-6 bg-white text-black rounded-full hover:bg-gray-100 transition duration-300 ease-in-out focus:ring-4 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-white'>
                        Color Specifications
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default WelcomePage