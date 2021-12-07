import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
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
import LoginPage from "./Session/LoginPage";
import ConfirmPage from "./Session/ConfirmPage";

function ViewCharacter() {
    const { characterId } = useParams();
    return (<CharacterView id={characterId}/>);
}

function EditCharacter() {
    const { characterId } = useParams();
    return (
        <SessionContext.Consumer>
            {context => (
                <CharacterEditor character={context.characters[parseInt(characterId ?? "0")]}/>
            )}
        </SessionContext.Consumer>
    );
}

function App() {
    return (
        <SessionProvider>
            <Container sx={{pb: 7}} maxWidth="lg" className="App">
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/skills" element={<NotImplemented title="Skills Directory"/>} />
                    <Route path="/events" element={<NotImplemented title="Events Calendar"/>} />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/confirm" element={<ConfirmPage/>}/>
                    <Route path="/profile" element={<ProfileView/>}/>
                    <Route path="/characters" element={<CharacterList/>} />
                    <Route path="/characters/:characterId" element={<ViewCharacter />} /> 
                    <Route path="/characters/:characterId/delete" element={<NotImplemented title="Character Deletion"/>} />
                    <Route path="/characters/:characterId/draft" element={<EditCharacter />} />
                </Routes>
                <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                    <LandingNavigation/>
                </Paper>
            </Container>
        </SessionProvider>
    );
}

export default App;

