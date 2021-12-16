import * as React from 'react';
import {useMountEffect} from "../Pages/UseMountEffect";
import sessionService from "../Session/SessionService";
import {Button, Container, Typography} from "@mui/material";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import {Event} from "../Protos/Larp";
import {
    DataGrid,
    GridApiRef,
    GridEventListener,
    GridEvents, GridRowParams,
    GridToolbarContainer, MuiEvent,
} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import Enumerable from "linq";
import AddIcon from '@mui/icons-material/Add';

interface EventItem {
    id: number;
    title: string;
    location: string;
    date: Date;
    eventType: string;
    rsvp: boolean;
}

function CreateEventItem(e: Event): EventItem {
    return {
        id: e.eventId,
        title: e.title,
        location: e.location,
        date: new Date(e.date),
        eventType: e.eventType,
        rsvp: e.eventType !== "Other"
    };
}

function randomId(): number {
    return Math.floor(Math.random() * -1000);
}

function EventManagerGrid(props: { events: EventItem[] }): any {

    const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
        //event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<GridEvents.rowEditStop> = async (params, event) => {
        const e = params.row as EventItem;
        await sessionService.updateEvent({
            eventId: e.id,
            title: e.title,
            location: e.location,
            date: e.date.toISOString(),
            eventType: e.eventType,
            rsvp: e.rsvp,
            attendees: []
        });
    };

    const columns = [
        {
            field: 'eventId',
            headerName: 'ID',
            width: 45
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 300,
            editable: true,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 200,
            editable: true,
        },
        {
            field: 'date',
            headerName: 'Start Date',
            type: "date",
            width: 150,
            editable: true,
        },
        {
            field: 'eventType',
            headerName: 'Type',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Other', 'Game', 'Maintenance']
        },
        {
            field: 'rsvp',
            headerName: 'Allow RSVP',
            type: "boolean",
            width: 150,
            editable: true,
        }
    ];
    return (<div style={{minHeight: "400px", width: '100%'}}>
        <DataGrid
            autoHeight
            rows={props.events}
            columns={columns}
            editMode="row"
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
        />
    </div>);
}

export default function EventManager() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(true);
    const [events, setEvents] = React.useState<EventItem[]>([]);

    useMountEffect(async () => {
        try {
            const events = Enumerable.from(await sessionService.getEvents())
                .select(x => CreateEventItem(x))
                .orderByDescending(x => x.date);
            setEvents(events.toArray());
        } catch (e) {
            alert(e);
            navigate("/login");
        }
        setBusy(false);
    });

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{mt: 2}} align="center">Events</Typography>
            {busy && <AwesomeSpinner/>}
            {!busy && <EventManagerGrid events={events}/>}
        </Container>
    );
}