import {Component} from "react";
import {ApplicationSession} from "./Session";
import SessionContext from "./SessionContext";

class SessionProvider extends Component {
    state = ApplicationSession.mock();

    render() {
        return (
            <SessionContext.Provider value={this.state}>
                {this.props.children}
            </SessionContext.Provider>
        );
    }
}

export default SessionProvider;