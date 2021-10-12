import React from 'react';
//import logo from './logo.svg';
import {Paper, Container} from "@mui/material";
import CharacterEditor from "./CharacterEditor/CharacterEditor";
import LandingNavigation from "./Common/LandingNavigation";
import './App.css';

function App() {
    return (
        <Container sx={{pb: 7}} maxWidth="lg" className="App">
            <CharacterEditor />
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <LandingNavigation/>
            </Paper>
        </Container>
    );
}

export default App;

