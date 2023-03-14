export type Cell = {
    color: string;
}

export type Grid = Cell[][];

export type CellPosition = {
    row: number;
    col: number;
}

export type CellColor = {
    color: string;
}

export type InitializeFunctionParams = {
    grid: Grid;
    cellPosition: CellPosition;
    newColor: CellColor;
}

export type InitializeFunction = (InitializeFunctionParams) => Promise<string>;

export interface InitializeBtnProps {
    initialize: InitializeFunction;
    grid: Grid;
    cellPosition: CellPosition;
    newColor: CellColor;
}