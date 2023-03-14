export type Cell = {
    color: string;
}

export type Grid = {
    [key: number]: Cell[];
}

export type CellPosition = {
    x: number;
    y: number;
}

export type NewColor = {
    color: string;
}

// Initialize returns a string
export interface InitializeBtnProps {
    initialize: () => string;
}