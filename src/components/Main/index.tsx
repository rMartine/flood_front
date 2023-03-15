import React, { useState, useEffect } from 'react';
import CalculateGridBtn from '../CalculateGridBtn';
import CustomNumericalInput from '../CustomNumericalInput';
import { CellPosition, CellColor, GridType, GetFloodedGridFunction, GetFloodedGridFunctionParams, UpdatingGridPosition } from '../../store/types';
import ColorPicker from '../ColorPicker';
import Grid from '../Grid';
import ColorList from '../ColorList';
import {colorList} from '../../store/constants';

const getRandomColor = () => {
    return colorList[Math.floor(Math.random() * colorList.length)].color;
};

const Main = () => {
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
    
    const [cellPosition, setCellPosition] = useState<CellPosition>({ row: 0, col: 0});
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [numberOfCols, setNumberOfCols] = useState(10);
    const [floodColor, setFloodColor] = useState(getRandomColor());
    const [randomColorA, setRandomColorA] = useState(getRandomColor());
    const [randomColorB, setRandomColorB] = useState(getRandomColor());
    const [randomColorC, setRandomColorC] = useState(getRandomColor());
    const [grid, setGrid] = useState<GridType>();
    const [isInitialized, setIsInitialized] = useState(false);
    const [isRecalculatingGrid, setIsRecalculatingGrid] = useState(false);
    const [updatingGridPosition, setUpdatingGridPosition] = useState<UpdatingGridPosition>({row: 0, col: 0, requestFloodedGrid: false});

    const initializeGrid = (colorA: CellColor, colorB: CellColor, colorC: CellColor): GridType => {
        const newGrid = [];
        for (let i = 0; i < numberOfRows; i++) {
            const row = [];
            for (let j = 0; j < numberOfCols; j++) {
                const tempListOfColors = [colorA, colorB, colorC];
                const randomColor = Math.floor(Math.random() * 3);
                row.push(tempListOfColors[randomColor]);
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
    }, [initializeGrid, isInitialized, numberOfRows, numberOfCols, randomColorA, randomColorB, randomColorC]);

    useEffect(() => {
        if (isRecalculatingGrid && numberOfRows && numberOfCols && randomColorA && randomColorB && randomColorC) {
            setGrid(initializeGrid({color: randomColorA}, {color: randomColorB}, {color: randomColorC}));
            setIsRecalculatingGrid(false);
        }
    }, [initializeGrid, isRecalculatingGrid, numberOfRows, numberOfCols, randomColorA, randomColorB, randomColorC]);

    useEffect(() => {
        if (isInitialized && updatingGridPosition.requestFloodedGrid && grid && cellPosition && floodColor) {
            getFloodedGrid({ grid, cellPosition: {row: updatingGridPosition.row, col: updatingGridPosition.col}, newColor: {color: floodColor} })
                .then((floodedGrid) => {
                    console.log('floodedGrid', floodedGrid);
                    setGrid(floodedGrid);
                    setUpdatingGridPosition({row: updatingGridPosition.row, col: updatingGridPosition.col, requestFloodedGrid: false});
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }
    }, [isInitialized, updatingGridPosition, grid, cellPosition, floodColor, getFloodedGrid]);


    return (
        <main className="grow h-4/6 w-full items-center justify-center bg-[#1C1C1E]">
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
            <div className="flex flex-row h-full my-1 items-center justify-center">
                <div className="flex flex-col w-1/6 h-full items-center">
                    <ColorPicker
                        tag='Flood color'
                        color={floodColor}
                        setColor={(color) => {
                            setFloodColor(color);
                        }}
                    />
                    <ColorList
                        tag='Random color A'
                        colors={colorList}
                        setColor={(color) => {
                            setRandomColorA(color);
                        }}
                        color={randomColorA}
                    />
                    <ColorList
                        tag='Random color B'
                        colors={colorList}
                        setColor={(color) => {
                            setRandomColorB(color);
                        }}
                        color={randomColorB}
                    />
                    <ColorList
                        tag='Random color C'
                        colors={colorList}
                        setColor={(color) => {
                            setRandomColorC(color);
                        }}
                        color={randomColorC}
                    />
                </div>
                <div className="flex flex-col w-5/6 h-full items-center">
                    {grid && <Grid
                        setCoordinates={(row: number, col: number, requestFloodedGrid: boolean) => {
                            setUpdatingGridPosition({ row, col, requestFloodedGrid });
                        }}
                        grid={grid}
                    />}
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
