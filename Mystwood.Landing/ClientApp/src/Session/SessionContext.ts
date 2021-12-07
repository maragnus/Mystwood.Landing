import React from "react";
import {ApplicationSession} from "./Session";

const SessionContext: React.Context<ApplicationSession> =
    React.createContext(ApplicationSession.mock());

export default SessionContext;