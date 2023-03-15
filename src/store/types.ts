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

export type InitializeFunction = (params: InitializeFunctionParams) => Promise<string>;

export interface CustomNumericalInputProps {
    tag: string;
    setValue: (value: number) => void;
    value: number;
}

export interface InitializeBtnProps {
    initialize: InitializeFunction;
    grid: Grid;
    cellPosition: CellPosition;
    newColor: CellColor;
}

export interface ColorPickerProps {
    tag: string;
    color: string;
    setColor: (color: string) => void;
}