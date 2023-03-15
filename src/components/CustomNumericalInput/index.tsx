import React, { useState, useEffect } from 'react';
import { CustomNumericalInputProps } from '../../store/types';

const CustomNumericalInput = ({ tag, setValue, value }: CustomNumericalInputProps) => {
    const [inputValue, setInputValue] = useState(value ?? 0);

    useEffect(() => {
        setValue(inputValue);
    }, [inputValue, setValue]);
    
    const validateInput = (testNumber: number) => {
        if (testNumber % 1 !== 0) {
            console.log('testNumber', testNumber)
            return (testNumber >= 1 ? Math.floor(testNumber) : 1);
        } else if (testNumber <= 0) {
            return 1;
        }
        return testNumber;
    };

    return (
        <div className="flex flex-col mx-8 items-center justify-center">
            <label className="text-gray-700 text-sm font-bold mb-2">{tag}</label>
            <input
                className="h-10 w-15 rounded-md border-2 border-gray-300 text-center"
                type="number"
                value={value}
                onChange={(e) => {
                    const validatedInput = validateInput(Number(e.target.value));
                    setInputValue(validatedInput);
                }}
            />
        </div>
    );
};

export default CustomNumericalInput;