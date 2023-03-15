import React from 'react';
import { CalculateGridBtnProps } from '../../store/types';

const CalculateGridBtn = (props: CalculateGridBtnProps) => {
    const { setCalculateFlag } = props;
    return (
        <button
            className="absolute bottom-12 left-2 w-52 h-10 rounded-md border-[#39FF14] bg-[#1C1C1E] border-4 text-white text-2xl text-center"
            onClick={() => setCalculateFlag()}
        >
            Re-Calculate Grid
        </button>
    );
};

export default CalculateGridBtn;