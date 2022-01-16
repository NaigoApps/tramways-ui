import React from "react";
import {User} from "@tramways/users-service-api";

type SessionContextType = {
    user: User | null,
    refreshUser: () => void
}

const SessionContext = React.createContext({} as SessionContextType);

export default SessionContext;
