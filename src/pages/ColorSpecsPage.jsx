import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import tinycolor from 'tinycolor2';
import { isLightColor } from '../utils/colorUtils';

const ColorSpecsPage = () => {
    const navigate = useNavigate();
    const { colorHex } = useParams();
    const [currentColor, setCurrentColor] = useState(`#${colorHex}`);

    useEffect(() => {
        setCurrentColor(`#${colorHex}`);
    }, [colorHex]);

    const color = tinycolor(currentColor);

    const contrastColors = [color.clone().complement().toHexString()];

    const monochromaticColors = color.monochromatic().map((c) => c.toHexString());

    const complementaryColor = color.complement().toHexString();
    const triadicColors = color.triad().map((c) => c.toHexString());
    const analogusColors = color.analogous().map((c) => c.toHexString());

    const isDark = color.isDark();
    const isLight = color.isLight();

    const brightnessLevels = [1.5, 1.4, 1.3, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.6, 0.5];
    const brightnessVariants = brightnessLevels.map((level) => {
        return color.clone().brighten(100 * (1 - level)).toHexString();
    });

    const saturationLevels = [1.5, 1.4, 1.3, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.6, 0.5];
    const saturationVariants = saturationLevels.map((level) => {
        return color.clone().saturate(100 * (1 - level)).toHexString();
    });

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setCurrentColor(newColor);
        navigate(`/color-specs/${newColor.replace('#', '')}`);
    };

    return (
        <div className='h-full flex flex-col justify-center items-center p-8 space-y-8 bg-gray-100 text-center'>
            <div className='flex'>
                <Link to='/' className='bg-gray-100 text-2xl py-3 px-6 rounded-full hover:bg-white transition duration-300 ease-in-out m-2'>Home</Link>
                <Link to='/generate' className='bg-gray-100 text-2xl py-3 px-6 rounded-full hover:bg-white transition duration-300 ease-in-out m-2'>Palette</Link>
            </div>

            <h1 className='text-5xl font-bold mb-4'>Color Specifications for {currentColor}</h1>

            <div className='space-y-4'>
                <h2 className='text-3xl'>Choose a Color</h2>
                <input
                    type='color'
                    value={currentColor}
                    onChange={handleColorChange}
                    className='w-32 h-32 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white'
                />
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl mb-2'>Color Formats</h2>
                <p>HEX: {color.toHexString()}</p>
                <p>RGB: {color.toRgbString()}</p>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl mb-2'>Brightness Variants</h2>
                <div className='flex border-gray-600 border-2'>
                    {brightnessVariants.map((variant, index) => {
                        const textColor = isLightColor(variant) ? 'text-black' : 'text-white';
                        return (
                            <div key={index} className={`w-32 h-32 flex justify-center items-center ${textColor}`} style={{ backgroundColor: variant }}>
                                {variant}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl mb-2'>Saturation Variants</h2>
                <div className='flex border-gray-600 border-2'>
                    {saturationVariants.map((variant, index) => {
                        const textColor = isLightColor(variant) ? 'text-black' : 'text-white';
                        return (
                            <div key={index} className={`w-32 h-32 flex justify-center items-center ${textColor}`} style={{ backgroundColor: variant }}>
                                {variant}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='mb-8 justify-center flex flex-col items-center'>
                <h2 className='text-2xl mb-2'>Contrast Colors</h2>
                <div className='flex border-gray-600 border-2 w-min'>
                    {contrastColors.map((variant, index) => {
                        const textColor = isLightColor(variant) ? 'text-black' : 'text-white';
                        return (
                            <div key={index} className={`w-32 h-32 flex justify-center items-center ${textColor}`} style={{ backgroundColor: variant }}>
                                {variant}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl mb-2'>Monochromatic Scale</h2>
                <div className='flex border-gray-600 border-2'>
                    {monochromaticColors.map((variant, index) => {
                        const textColor = isLightColor(variant) ? 'text-black' : 'text-white';
                        return (
                            <div key={index} className={`w-32 h-32 flex justify-center items-center ${textColor}`} style={{ backgroundColor: variant }}>
                                {variant}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl mb-2'>Triadic Colors</h2>
                <div className='flex border-gray-600 border-2'>
                    {triadicColors.map((variant, index) => {
                        const textColor = isLightColor(variant) ? 'text-black' : 'text-white';
                        return (
                            <div key={index} className={`w-32 h-32 flex justify-center items-center ${textColor}`} style={{ backgroundColor: variant }}>
                                {variant}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl mb-2'>Analogous Colors</h2>
                <div className='flex border-gray-600 border-2'>
                    {analogusColors.map((variant, index) => {
                        const textColor = isLightColor(variant) ? 'text-black' : 'text-white';
                        return (
                            <div key={index} className={`w-32 h-32 flex justify-center items-center ${textColor}`} style={{ backgroundColor: variant }}>
                                {variant}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl mb-2'>HSL Representation</h2>
                <p>{color.toHslString()}</p>
            </div>

            <div className='mb-8'>
                <h2 className='text-2xl mb-2'>Color Properties</h2>
                <p>{isDark ? 'Dark' : 'Light'} Color</p>
            </div>
        </div>
    )
}

export default ColorSpecsPage