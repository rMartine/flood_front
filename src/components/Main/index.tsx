import React, { useEffect } from 'react';
import InitializeBtn from '../InitializeBtn';
import { InitializeFunction, InitializeFunctionParams } from '../../store/types';

const Main = () => {
    const getFloodedGrid: InitializeFunction = async ({
        grid,
        cellPosition,
        newColor,
    }: InitializeFunctionParams) => {
        try {
            const response = await fetch('http://localhost:5000/flood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    originalGrid: grid,
                    cellPosition,
                    newColor,
                }),
            });
            
            const data = await response.json();
            console.log('Success:', data);
            return data.floodedGrid;
        } catch (error) {
            console.error('Error:', error);
            return error as string;
        }
    };

    const grid = [
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }],
        [{ color: 'red' }, { color: 'red' }, { color: 'red' }],
    ];
    const cellPosition = { row: 0, col: 0};
    const newColor = {color: 'blue'};

    return (
        <div className="main">
            <div className="main-text">Content</div>
            <InitializeBtn
                initialize={getFloodedGrid}
                grid={grid}
                cellPosition={cellPosition}
                newColor={newColor}
            />
        </div>
    );
};

export default Main;
