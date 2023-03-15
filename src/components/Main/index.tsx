import React, { useState, useEffect } from 'react';
import InitializeBtn from '../InitializeBtn';
import CustomNumericalInput from '../CustomNumericalInput';
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

    const [numberOfRows, setNumberOfRows] = useState(1);
    const [numberOfCols, setNumberOfCols] = useState(1);

    return (
        <main className="grow h-4/6 w-full items-center justify-center bg-gray-100">
            <div className="flex flex-row items-center justify-center">
                <CustomNumericalInput
                    tag="Number of rows"
                    setValue={(value: number) => {
                        setNumberOfRows(value);
                    }}
                    value={numberOfRows}
                />
                <CustomNumericalInput
                    tag="Number of columns"
                    setValue={(value: number) => {
                        setNumberOfCols(value);
                    }}
                    value={numberOfCols}
                />
            </div>
            <InitializeBtn
                initialize={getFloodedGrid}
                grid={grid}
                cellPosition={cellPosition}
                newColor={newColor}
            />
        </main>
    );
};

export default Main;
