import React, { createContext, useContext, useState } from "react";

type DetectionResults = {
    localUri?: string;
    fileName?: string;
    numDetections?: number;
    detectionTime?: string | number;
    averageCocolisap?: number;
    classification?: string;
};

type ResultsContextType = {
    results: DetectionResults[];  
    addResult: (newResult: DetectionResults) => void;  
};

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [results, setResultsState] = useState<DetectionResults[]>([]);

    const addResult = (newResult: DetectionResults): void => {
        setResultsState((prevResults) => [...prevResults, newResult]);
    };

    return (
        <ResultsContext.Provider value={{ results, addResult }}>
            {children}
        </ResultsContext.Provider>
    );
};

export const useResults = () => {
    const context = useContext(ResultsContext);
    if (!context) {
        throw new Error("useResults must be used within a ResultsProvider");
    }
    return context;
};
