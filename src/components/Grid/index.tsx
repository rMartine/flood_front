import React, {useEffect, useState} from 'react';
import { GridProps } from '../../store/types';

const Grid = ({ setCoordinates, grid }: GridProps) => {
    const [gridSize, setGridSize] = useState({width: 0, height: 0});

    const getGridSize = () => {
        const width = document.querySelector('.grid')?.clientWidth;
        const height = document.querySelector('.grid')?.clientHeight;
        if (width && height) {
            setGridSize({width, height});
        }
    };

    const calculateCellSize = () => {
        if (!grid || !grid.length) {
            return {cellWidth: 0, cellHeight: 0};
        }
        const {width, height} = gridSize;
        const {rows, cols} = grid.length && grid[0].length ? {rows: grid.length, cols: grid[0].length} : {rows: 0, cols: 0};
        const cellWidth = width / cols;
        const cellHeight = height / rows;
        return {cellWidth, cellHeight};        
    };

    useEffect(() => {
        getGridSize();
        window.addEventListener('resize', getGridSize);
        return () => window.removeEventListener('resize', getGridSize);
    }, []);

    useEffect(() => {
        getGridSize();
    }, [grid]);

    useEffect(() => {
        const {cellWidth, cellHeight} = calculateCellSize();
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellHeight}px`;
        });
    }, [gridSize]);

    // If grid is undefined or empty, return an H1 element with the text "Loading..."
    if (!grid || !grid.length) {
        return <h1 className="text-2xl text-center">Loading...</h1>;
    }

    return (
        <table className="mx-auto border-2 border-gray-500 rounded-md bg-white shadow-lg z-0">
            <tbody>
                {grid.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td
                                key={j}
                                className="w-10 h-10"
                                style={{ backgroundColor: cell.color }}
                                onClick={() => setCoordinates({row:i, col: j})}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Grid;