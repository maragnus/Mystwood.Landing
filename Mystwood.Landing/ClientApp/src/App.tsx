import * as React from 'react';
import {Route, Routes, useNavigate, useParams} from 'react-router-dom';
import {Container, Paper} from "@mui/material";
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
import CharacterSearch from "./Manage/CharacterSearch";
import PlayerSearch from "./Manage/PlayerSearch";
import {PlayerManager} from "./Manage/PlayerManager";
import {CharacterManager} from "./Manage/CharacterManager";
import EventList from "./Pages/EventList";
import EventManager from "./Manage/EventManager";
import EventView from "./Pages/EventView";

function ViewCharacter() {
    const {characterId} = useParams();
    return (<CharacterView id={characterId}/>);
}

function ViewEvent() {
    const {eventId} = useParams();
    return (<EventView id={parseInt(eventId!)}/>);
}

function EditCharacter() {
    const {characterId} = useParams();
    return (<CharacterEditor characterId={characterId!}/>);
}

function ManageCharacter() {
    const {characterId} = useParams();
    return (<CharacterManager characterId={characterId!}/>);
}

function ManagePlayer() {
    const {playerId} = useParams();
    return (<PlayerManager playerId={parseInt(playerId!)}/>);
}

function StartDemoMode() {
    const navigate = useNavigate();

    useMountEffect(async () => {
        await sessionService.confirm("demo", "demo");
        navigate("/characters");
    });

    return (<AwesomeSpinner/>);
}

function Redirect(params: { to: string }) {
    const navigate = useNavigate();

    useMountEffect(async () => {
        navigate(params.to);
    });

    return <div></div>;
}

function App() {
    return (
        <Container sx={{pb: 7}} maxWidth="xl" className="App">
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/demo" element={<StartDemoMode/>}/>
                <Route path="/skills" element={<NotImplemented title="Skills Directory"/>}/>
                <Route path="/events" element={<EventList/>}/>
                <Route path="/events/new" element={<NotImplemented title="Event New"/>}/>
                <Route path="/events/manage" element={<EventManager />}/>
                <Route path="/events/:eventId" element={<ViewEvent/>}/>
                <Route path="/events/:eventId/manage" element={<NotImplemented title="Event Editor"/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/confirm" element={<ConfirmPage/>}/>
                <Route path="/profile" element={<ProfileView/>}/>
                <Route path="/players" element={<Redirect to="/players/search"/>}/>
                <Route path="/players/search" element={<PlayerSearch/>}/>
                <Route path="/players/:playerId" element={<ManagePlayer/>}/>
                <Route path="/characters" element={<CharacterList/>}/>
                <Route path="/characters/search" element={<CharacterSearch/>}/>
                <Route path="/characters/new" element={<CharacterNew/>}/>
                <Route path="/characters/:characterId" element={<ViewCharacter/>}/>
                <Route path="/characters/:characterId/manage" element={<ManageCharacter/>}/>
                <Route path="/characters/:characterId/delete" element={<NotImplemented title="Character Deletion"/>}/>
                <Route path="/characters/:characterId/draft" element={<EditCharacter/>}/>
            </Routes>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000}} elevation={3}>
                <LandingNavigation/>
            </Paper>
        </Container>
    );
}

export default App;

