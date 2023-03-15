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
                    <option key={item.tag} value={item.color} className={`w-full bg-[${item.color}]`}>
                        {item.tag}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ColorList;