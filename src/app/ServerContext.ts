import React from 'react';

interface ServerContextType {
    server: number;
    setServer: React.Dispatch<React.SetStateAction<number>>;
}

export const ServerContext = React.createContext({
    server: 3682,
    setServer: x => {}
} as ServerContextType);