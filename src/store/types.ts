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
// Declarre a function interface named InitializeFunction which arguments conform to the InitializeFunctionParams type and returns a Promise of type string
export type InitializeFunction = (params: InitializeFunctionParams) => Promise<string>;

export interface InitializeBtnProps {
    initialize: InitializeFunction;
    grid: Grid;
    cellPosition: CellPosition;
    newColor: CellColor;
}