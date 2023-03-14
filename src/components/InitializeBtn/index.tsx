// This button will receive a function that takes three parameters as props:
// 1. The first parameter "originalGrid" will be a 2D grid of variable size (rows and cols). Each cell will contain a string corresponding to an hex color in RGB format. The grid comes from a java object.
// 2. The second parameter "cellPosition" will be tuple: row and coll pointing to an existing cell in the grid.
// 3. The third parameter "newColor" will be a string corresponding to an hex color in RGB format.

// The button will call the function that was passed as props with the three parameters mentioned above.
import React from 'react';
import { InitializeBtnProps } from '../../store/types';

const InitializeBtn = (props: InitializeBtnProps) => {
    const { initialize } = props;
    
    return (
        <button
            className="initialize-btn"            
            onClick={
                () => {
                    initialize();
                }
            }
        >
            Initialize
        </button>
    );
};

export default InitializeBtn;