import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { ColorPickerProps } from '../../store/types';

const ColorPicker = ({tag, color, setColor}: ColorPickerProps) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (color: any) => {
        setColor(color.hex);
    };

    return (
        <div className="flex flex-col w-32 h-32 mx-1.5 my-1.5 items-center justify-center border-2 border-teal-600 rounded-md bg-[#D3D3D3]">
            <label className="text-gray-700 text-sm font-bold mb-2">{tag}</label>
            <button
                className="h-10 w-24 rounded-md border-2 border-[#00C2FF] text-center"
                onClick={handleClick}
                style={{ backgroundColor: color }}
            />
            {displayColorPicker ? (
                <div className="flex flex-col mx-8 items-center justify-center">
                    <div className="fixed top-0 left-0 w-full h-full z-10" onClick={handleClose} />
                    <div className="absolute z-20">
                        <SketchPicker color={color} onChange={handleChange} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ColorPicker;