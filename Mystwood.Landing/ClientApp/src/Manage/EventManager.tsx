import * as React from 'react';
import {useMountEffect} from "../Pages/UseMountEffect";
import sessionService from "../Session/SessionService";
import {Container, Typography} from "@mui/material";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import {Event} from "../Protos/Larp";
import {DataGrid} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";

function EventManagerGrid(props: { events: Event[] }): any {
    const columns = [
        { field: 'eventId', headerName: 'ID', width: 90 },
        {
            field: 'title',
            headerName: 'Title',
            width: 150,
            editable: true,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 150,
            editable: true,
        },
    ];
    console.log(props.events);
    return (<div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={props.events}
                columns={columns}
                getRowId={(event) => event.eventId}
            />
        </div>);
}

export default function EventManager() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(true);
    const [events, setEvents] = React.useState<Event[]>([]);

    useMountEffect(async () => {
        try {
            const events = await sessionService.getEvents();
            setEvents(events);
        } catch (e) {
            alert(e);
            navigate("/login");
        }
        setBusy(false);
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{mt: 2}} align="center">Events</Typography>
            {busy && <AwesomeSpinner/>}
            {!busy && <EventManagerGrid events={events}/>}
        </Container>
    );
}