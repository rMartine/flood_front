import React from 'react';
import { InitializeBtnProps } from '../../store/types';

const InitializeBtn = (props: InitializeBtnProps) => {
    const {
        initialize,
        grid,
        cellPosition,
        newColor
    } = props;
    
    return (
        <button
            className="initialize-btn"            
            onClick={() => initialize({ grid, cellPosition, newColor })}
        >
            Initialize
        </button>
    );
};

export default InitializeBtn;