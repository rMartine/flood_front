export type Cell = {
    color: string;
}

export type GridType = Cell[][];

export type CellPosition = {
    row: number;
    col: number;
}

export type CellColor = {
    color: string;
}

export type GetFloodedGridFunctionParams = {
    grid: GridType;
    cellPosition: CellPosition;
    newColor: CellColor;
}

export type GetFloodedGridFunction = (params: GetFloodedGridFunctionParams) => Promise<GridType>;

export interface CustomNumericalInputProps {
    tag: string;
    setValue: (value: number) => void;
    value: number;
}

export interface CalculateGridBtnProps {
    setCalculateFlag: () => void;
}

export interface ColorPickerProps {
    tag: string;
    color: string;
    setColor: (color: string) => void;
}

export interface GridProps {
    setCoordinates: (coordinates: CellPosition) => void;
    grid: GridType | undefined;
}