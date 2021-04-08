import React from "react";
import {User} from "./api/generated/users";

type SessionContextType = {
    user: User | null,
    refreshUser: () => void
}

const SessionContext = React.createContext({} as SessionContextType);

export default SessionContext;
