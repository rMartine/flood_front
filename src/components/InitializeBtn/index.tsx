import React from 'react';
import { InitializeBtnProps } from '../../store/types';

const InitializeBtn = (props: InitializeBtnProps) => {
    const {
        initialize,
        grid,
        cellPosition,
        newColor
    } = props;
     // The button is positioned on the lower left corner of its parent and has a fixed width and height. It also has a margin of 10px on the x axis and bottom.
    return (
        <button
            className="absolute bottom-12 left-2 w-40 h-10 rounded-md bg-blue-400 text-white text-2xl text-center"
            onClick={() => initialize({ grid, cellPosition, newColor })}
        >
            Initialize
        </button>
    );
};

export default InitializeBtn;