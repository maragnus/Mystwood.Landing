import React from 'react';
import {Route, RouteComponentProps} from 'react-router-dom';
import {Paper, Container} from "@mui/material";
import CharacterEditor from "./CharacterEditor/CharacterEditor";
import LandingNavigation from "./Common/LandingNavigation";
import './App.css';
import ProfileView from "./Pages/ProfileView";
import CharacterList from "./Pages/CharacterList";
import CharacterView from "./CharacterView/CharacterView";
import SessionProvider from "./Session/SessionProvider";
import SessionContext from "./Session/SessionContext";
import Landing from "./Pages/Landing";
import NotImplemented from "./Pages/NotImplemented";

interface CharacterParams {
    id?: string
}

function ViewCharacter({match}: RouteComponentProps<CharacterParams>) {
    return (<CharacterView id={match.params.id}/>);
}

function EditCharacter({match}: RouteComponentProps<CharacterParams>) {
    console.log(match);
    return (
        <SessionContext.Consumer>
            {context => (
                <CharacterEditor character={context.characters[parseInt(match.params.id ?? "0")]}/>
            )}
        </SessionContext.Consumer>
    );
}

function App() {
    return (
        <SessionProvider>
            <Container sx={{pb: 7}} maxWidth="lg" className="App">
                <Route exact path="/" component={Landing}/>
                <Route exact path="/skills">
                    <NotImplemented title="Skills Directory"/>
                </Route>
                <Route exact path="/events">
                    <NotImplemented title="Events Calendar"/>
                </Route>
                <Route exact path="/profile" component={ProfileView}/>
                <Route exact path="/characters" component={CharacterList}/>
                <Route exact path="/characters/:id" component={ViewCharacter}/>
                <Route path="/characters/:id/draft" component={EditCharacter}/>
                <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                    <LandingNavigation/>
                </Paper>
            </Container>
        </SessionProvider>
    );
}

export default App;

