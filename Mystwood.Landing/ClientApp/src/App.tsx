import * as React from 'react';
import {Routes, Route, useParams, useNavigate} from 'react-router-dom';
import {Paper, Container} from "@mui/material";
import CharacterEditor from "./CharacterEditor/CharacterEditor";
import LandingNavigation from "./Common/LandingNavigation";
import './App.css';
import ProfileView from "./Pages/ProfileView";
import CharacterList from "./Pages/CharacterList";
import CharacterView from "./CharacterView/CharacterView";
import Landing from "./Pages/Landing";
import NotImplemented from "./Pages/NotImplemented";
import LoginPage from "./Session/LoginPage";
import ConfirmPage from "./Session/ConfirmPage";
import CharacterNew from "./CharacterEditor/CharacterNew";
import AwesomeSpinner from "./Common/AwesomeSpinner";
import {useMountEffect} from "./Pages/UseMountEffect";
import sessionService from "./Session/SessionService";

function ViewCharacter() {
    const { characterId } = useParams();
    return (<CharacterView id={characterId}/>);
}

function EditCharacter() {
    const { characterId } = useParams();
    return (<CharacterEditor characterId={characterId!}/>);
}

function StartDemoMode() {
    const navigate = useNavigate();

    useMountEffect(async () => {
        await sessionService.confirm("demo", "demo");
        navigate("/characters");
    });
    
    return (<AwesomeSpinner/>);
}

function App() {
    return (
        <Container sx={{pb: 7}} maxWidth="lg" className="App">
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/demo" element={<StartDemoMode/>}/>
                <Route path="/skills" element={<NotImplemented title="Skills Directory"/>} />
                <Route path="/events" element={<NotImplemented title="Events Calendar"/>} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/confirm" element={<ConfirmPage/>}/>
                <Route path="/profile" element={<ProfileView/>}/>
                <Route path="/characters" element={<CharacterList/>} />
                <Route path="/characters/new" element={<CharacterNew />} />
                <Route path="/characters/:characterId" element={<ViewCharacter />} />
                <Route path="/characters/:characterId/delete" element={<NotImplemented title="Character Deletion"/>} />
                <Route path="/characters/:characterId/draft" element={<EditCharacter />} />
            </Routes>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <LandingNavigation/>
            </Paper>
        </Container>
    );
}

export default App;

