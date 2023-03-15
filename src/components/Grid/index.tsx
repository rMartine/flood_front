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

        const cells = document.querySelectorAll('td');
        let maxCellWidth = 0;
        let maxCellHeight = 0;

        cells.forEach(cell => {
            const cellRect = cell.getBoundingClientRect();
            maxCellWidth = Math.max(maxCellWidth, cellRect.width);
            maxCellHeight = Math.max(maxCellHeight, cellRect.height);
        });

        const {width, height} = gridSize;
        const {rows, cols} = {rows: grid.length, cols: grid[0].length};
        const cellWidth = Math.floor(width / cols);
        const cellHeight = Math.floor(height / rows);
        const maxWidth = Math.max(cellWidth, maxCellWidth);
        const maxHeight = Math.max(cellHeight, maxCellHeight);

        return {cellWidth: maxWidth, cellHeight: maxHeight};
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
    }, [gridSize, calculateCellSize]);

    if (!grid || !grid?.length) {
        return <h1 className="text-2xl text-center">Loading...</h1>;
    }

    return (
        <table className="h-[600px] w-[600px] m-auto mt-2 border-2 border-gray-500 rounded-md bg-white shadow-lg z-0">
            <tbody>
                {grid.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td
                                key={j}
                                className="cursor-pointer"
                                style={{ backgroundColor: cell.color }}
                                onClick={() => setCoordinates(i, j, true)}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Grid;