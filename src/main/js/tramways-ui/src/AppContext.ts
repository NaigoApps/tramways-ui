import React from "react";

type AppContextType = {
    error: string;
    notifyError: (err: string) => void;
    clearError: () => void;
    message: string;
    notifyMessage: (msg: string) => void;
    clearMessage: () => void;
    loading: number;
    startLoading: () => void;
    stopLoading: () => void;
    appBarTitle: string;
    setAppBarTitle: (title: string) => void;
}

const AppContext = React.createContext({} as AppContextType);

export default AppContext;
