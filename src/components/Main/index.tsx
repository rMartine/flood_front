import React, { useState, useEffect } from 'react';
import InitializeBtn from '../InitializeBtn';
import CustomNumericalInput from '../CustomNumericalInput';
import { InitializeFunction, InitializeFunctionParams } from '../../store/types';
import ColorPicker from '../ColorPicker';

const Main = () => {

    // TODO: Move this to a separate file or even better a saga.
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
    const [numberOfRows, setNumberOfRows] = useState(1);
    const [numberOfCols, setNumberOfCols] = useState(1);
    const [floodColor, setFloodColor] = useState('#0000FF');
    const [randomColorA, setRandomColorA] = useState('#0000FF');
    const [randomColorB, setRandomColorB] = useState('#0000FF');
    const [randomColorC, setRandomColorC] = useState('#0000FF');

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        setFloodColor(getRandomColor());
        setRandomColorA(getRandomColor());
        setRandomColorB(getRandomColor());
        setRandomColorC(getRandomColor());
    }, []);


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
            <div className="flex flex-row my-6 items-center justify-center">
                <div className="flex flex-col w-1/6 h-full items-center justify-center bg-blue-300">
                    <ColorPicker
                        tag='Flood color'
                        color={floodColor}
                        setColor={(color) => {
                            setFloodColor(color);
                        }}
                    />
                    <ColorPicker
                        tag='Random color A'
                        color={randomColorA}
                        setColor={(color) => {
                            setRandomColorA(color);
                        }}
                    />
                    <ColorPicker
                        tag='Random color B'
                        color={randomColorB}
                        setColor={(color) => {
                            setRandomColorB(color);
                        }}
                    />
                    <ColorPicker
                        tag='Random color C'
                        color={randomColorC}
                        setColor={(color) => {
                            setRandomColorC(color);
                        }}
                    />
                </div>
                <div className="flex flex-col w-5/6 h-full items-center justify-center bg-blue-300" />
            </div>
            <InitializeBtn
                initialize={getFloodedGrid}
                grid={grid}
                cellPosition={cellPosition}
                newColor={{color: floodColor}}
            />
        </main>
    );
};

export default Main;
