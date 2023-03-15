import React from 'react';
import { CalculateGridBtnProps } from '../../store/types';

const CalculateGridBtn = (props: CalculateGridBtnProps) => {
    const { setCalculateFlag } = props;
    return (
        <button
            className="absolute bottom-12 left-2 w-40 h-10 rounded-md bg-blue-400 text-white text-2xl text-center"
            onClick={() => setCalculateFlag()}
        >
            Initialize
        </button>
    );
};

export default CalculateGridBtn;