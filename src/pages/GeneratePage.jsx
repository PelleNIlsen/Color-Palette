import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import randomHex from 'random-hex';
import { FiLock, FiUnlock, FiCopy, FiX } from 'react-icons/fi';
import { isLightColor } from '../utils/colorUtils';

const GeneratePage = () => {
    const navigate = useNavigate();
    const { palette } = useParams();
    const [colors, setColors] = useState(Array(5).fill().map(() => ({ value: randomHex.generate(), locked: false })));

    useEffect(() => {
        if (palette) {
            const urlColors = palette.split('-').map(color => ({ value: `#${color}`, locked: false }));
            setColors(urlColors);
        }
    }, [palette]);

    const generateNewColors = () => {
        const newColors = colors.map(color => {
            if (color.locked) return color;
            return { value: randomHex.generate(), locked: false };
        });
        setColors(newColors);
    };

    const toggleLock = (index) => {
        const newColors = [...colors];
        newColors[index].locked = !newColors[index].locked;
        setColors(newColors);
    };

    const copyHexCode = (hexCode) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(hexCode).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = hexCode;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                console.log('Hex code copied to clipboard');
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            document.body.removeChild(textarea);
        }
    };

    const addColorBox = () => {
        setColors([...colors, { value: randomHex.generate(), locked: false }]);
    };

    const removeColorBox = (index) => {
        const newColors = colors.slice(0, index).concat(colors.slice(index + 1));
        setColors(newColors);
    };

    const savePalette = () => {
        const paletteColors = colors.map(color => color.value.replace('#', '')).join('-');
        navigate(`/generate/${paletteColors}`);
    };

    return (
        <div className='h-screen w-full flex flex-wrap md:flex-nowrap relative'>
            {colors.map((color, i) => {
                const textColor = isLightColor(color.value) ? 'text-black' : 'text-white';

                return (
                    <div key={i} className='w-full md:flex-1 flex flex-col justify-center items-center p-6 pb-32 pt-32' style={{ backgroundColor: color.value }}>
                        <Link to={`/color-specs/${color.value.replace('#', '')}`}>
                            <div className={`${textColor} text-4xl font-bold rounded-full bg-opacity-20 hover:bg-opacity-40 bg-gray-50 p-5`} title='Color Specifications'>{color.value}</div>
                        </Link>
                        <div className='flex space-x-4 mt-4'>
                            <button
                                onClick={() => toggleLock(i)}
                                className={`p-4 ${textColor} rounded-full bg-opacity-20 hover:bg-opacity-40 bg-gray-50`}
                                title='lock color'
                            >
                                {color.locked ? (
                                    <FiLock size={30} />
                                ) : (
                                    <FiUnlock size={30} />
                                )}
                                
                            </button>
                            <button
                                onClick={() => copyHexCode(color.value)}
                                className={`p-4 ${textColor} rounded-full bg-opacity-20 hover:bg-opacity-40 bg-gray-50`}
                                title='Copy hex code'
                            >
                                <FiCopy size={30} />
                            </button>
                            <button
                                onClick={() => removeColorBox(i)}
                                className={`p-4 ${textColor} rounded-full bg-opacity-20 hover:bg-opacity-40 bg-gray-50`}
                                title='Delete color box'
                            >
                                <FiX size={30} />
                            </button>
                        </div>
                    </div>
                )
            })}
            <div className='fixed bottom-0 left-0 w-full flex justify-center items-center p-4 bg-white'>
                <Link to='/' title='Back to homepage'>
                    <button 
                        className='text-2xl p-4 px-5 mr-4 rounded-full bg-cyan-400 text-white hover:bg-cyan-500 transition duration-300 ease-in-out'
                    >
                        Home
                    </button>
                </Link>
                <div className='flex space-x-4'>
                    <button 
                        onClick={addColorBox}
                        className='text-2xl p-4 px-5 rounded-full bg-green-400 text-white hover:bg-green-500 transition duration-300 ease-in-out'
                        title='Add color box'
                    >
                        Add
                    </button>
                    <button 
                        onClick={generateNewColors}
                        className='text-2xl p-4 px-5 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition duration-300 ease-in-out'
                        title='Generate random colors'
                    >
                        Generate
                    </button>
                    <button 
                        onClick={savePalette}
                        className='text-2xl p-4 px-5 rounded-full bg-purple-400 text-white hover:bg-purple-500 transition duration-300 ease-in-out'
                        title='Save palette to URL'
                    >
                        Save
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default GeneratePage