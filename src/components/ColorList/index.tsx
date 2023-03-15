// This control is a dropdown list that allows the user to select a color from a list of colors.
// When initializing (first render) the color should be set to the a random item of the list.
// No empty selection should be allowed.
// Each item in the list show display an Hex color code, A color name and a smal square (h-5 x w-5) of that color.
// The prop for this component is a function that takes a string as a parameter in the format of an hex color code.
// The list of possible colors is defined in the src\store\constants.ts file as an enum.

import React, { useState } from 'react';
import { ColorListProps } from '../../store/types';

const ColorList = ({ tag, colors, setColor, color }: ColorListProps) => {
    const handleChange = (event: any) => {
        setColor(event.target.value);
    };

    if (!colors) {
        return null;
    }

    return (
        <div className="flex flex-col w-40 h-32 px-1 mx-1.5 my-1.5 items-center justify-center border-2 border-teal-600 rounded-md bg-[#D3D3D3]">
            <label className="text-gray-700 text-sm font-bold mb-2">{tag}</label>
            <select
                className="h-10 w-full rounded-md border-2 text-center border-[#00C2FF]"
                onChange={handleChange}
                value={color}
            >
                {colors.map((item) => (
                    <option key={item.tag} value={item.color} className="w-full">
                        <label className={`text-gray-700 text-xs font-bold bg-[${item.color}]`}>{item.tag}</label>
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ColorList;