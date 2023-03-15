// Using react-color this component is a button that when clicked shows a Modal with a color picker.
// The color picker is used to select the color of various aspects of the app so it has to be generic.
// The color picker is used to select the color of the cell that will be flooded.

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

    // Label should be the tag prop and positioned in the top left corner of the color picker modal. the font weight and size should be bold and 16px respectively. The color of the label should be gray-700. The color picker modal should be positioned in the center of the screen. The color picker modal should have a border of 1px and the color should be gray-300. The color picker modal should have a border radius of 5px. The color picker modal should have a background color of white. The color picker modal should have a width of 300px. The color picker modal should have a height of 300px. The color picker modal should have a padding of 20px. The color picker modal should have a box shadow of 0 0 10px 0 rgba(0, 0, 0, 0.2). The color picker modal should have a z-index of 10. The color picker modal should have a position of absolute. The color picker modal should have a top of 50%. The color picker modal should have a left of 50%. The color picker modal should have a transform of translate(-50%, -50%).
    return (
        <div className="flex flex-col w-32 h-32 mx-1.5 my-1.5 items-center justify-center border-2 border-teal-600 rounded-md bg-cyan-100">
            <label className="text-gray-700 text-sm font-bold mb-2">{tag}</label>
            <button
                className="h-10 w-24 rounded-md border-2 border-gray-300 text-center"
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