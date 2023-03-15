import React, { useState, useEffect } from 'react';
import CalculateGridBtn from '../CalculateGridBtn';
import CustomNumericalInput from '../CustomNumericalInput';
import { CellPosition, CellColor, GridType, GetFloodedGridFunction, GetFloodedGridFunctionParams } from '../../store/types';
import ColorPicker from '../ColorPicker';
import Grid from '../Grid';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Main = () => {

    // TODO: Move this to a separate file or even better a saga.
    const getFloodedGrid: GetFloodedGridFunction = async ({
        grid,
        cellPosition,
        newColor,
    }: GetFloodedGridFunctionParams) => {
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
    
    const cellPosition: CellPosition = { row: 0, col: 0};
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [numberOfCols, setNumberOfCols] = useState(10);
    const [floodColor, setFloodColor] = useState(getRandomColor());
    const [randomColorA, setRandomColorA] = useState(getRandomColor());
    const [randomColorB, setRandomColorB] = useState(getRandomColor());
    const [randomColorC, setRandomColorC] = useState(getRandomColor());
    const [grid, setGrid] = useState<GridType>();
    const [isInitialized, setIsInitialized] = useState(false);
    const [isRecalculatingGrid, setIsRecalculatingGrid] = useState(false);

    const initializeGrid = (colorA: CellColor, colorB: CellColor, colorC: CellColor): GridType => {
        const newGrid = [];
        for (let i = 0; i < numberOfRows; i++) {
            const row = [];
            for (let j = 0; j < numberOfCols; j++) {
                row.push({ color: getRandomColor() });
            }
            newGrid.push(row);
        }
        return newGrid;
    };

    useEffect(() => {
        if (!isInitialized && numberOfRows && numberOfCols && randomColorA && randomColorB && randomColorC) {
            setGrid(initializeGrid({color: randomColorA}, {color: randomColorB}, {color: randomColorC}));
            setIsInitialized(true);
        }
    }, [numberOfRows, numberOfCols, randomColorA, randomColorB, randomColorC]);

    useEffect(() => {
        if (isRecalculatingGrid && numberOfRows && numberOfCols && randomColorA && randomColorB && randomColorC) {
            setGrid(initializeGrid({color: randomColorA}, {color: randomColorB}, {color: randomColorC}));
            setIsRecalculatingGrid(false);
        }
    }, [isRecalculatingGrid, numberOfRows, numberOfCols, randomColorA, randomColorB, randomColorC]);


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
                <div className="flex flex-col w-5/6 h-full items-center justify-center bg-blue-300">
                    <Grid
                        setCoordinates={(coordinates: CellPosition) => {
                            const { row, col } = coordinates;
                            console.log('Cell position', row, col);
                        }}
                        grid={grid}
                    />
                </div>
            </div>
            <CalculateGridBtn
                setCalculateFlag={() => {
                    setIsRecalculatingGrid(true);
                }}
            />
        </main>
    );
};

export default Main;
