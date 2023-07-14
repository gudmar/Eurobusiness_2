export const BOTTOM = 'Bottom';
export const TOP = 'Top';
export const LEFT = 'Left';
export const RIGHT = 'Right';

export type tBoardSideDirections = 'Bottom' | 'Top' | 'Left' | 'Right';

export type tBoardSide = {
    direction: tBoardSideDirections,
    
}

export interface iBoardSide {
    direction: tBoardSideDirections,
}
