import React from "react";
import {User} from "./api/generated";

type SessionContext = {
    user: User | null,
    refreshUser: () => void
}

const SessionContext = React.createContext({} as SessionContext);

export default SessionContext;
