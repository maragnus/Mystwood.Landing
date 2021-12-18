import * as React from 'react';
import {useMountEffect} from "../Pages/UseMountEffect";
import sessionService from "../Session/SessionService";
import {Button, Container, Typography} from "@mui/material";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import {Event} from "../Protos/Larp";
import {
    DataGrid, GridEventListener, GridEvents
} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import Enumerable from "linq";
import AddIcon from '@mui/icons-material/Add';

interface EventItem {
    id: number;
    title: string;
    location: string;
    date?: Date;
    eventType: string;
    rsvp: boolean;
    hidden: boolean;
    isNew: boolean;
}

function CreateEventItem(e: Event, isNew: boolean): EventItem {
    let date = Date.parse(e.date);

    return {
        id: e.eventId,
        title: e.title,
        location: e.location,
        date: isNaN(date) ? undefined : new Date(date),
        eventType: e.eventType,
        rsvp: e.rsvp,
        hidden: e.hidden,
        isNew: isNew
    };
}

function randomId(): number {
    return 100000 + Math.floor(Math.random() * 100000);
}

function EventManagerGrid(props: { events: EventItem[] }): any {
    const [events, setEvents] = React.useState<EventItem[]>(props.events);

    const handleRowEditStop: GridEventListener<GridEvents.rowEditStop> = async (params, _) => {
        let e = params.row as EventItem;
        console.log(e.date);
        const updatedEvent = await sessionService.updateEvent({
            eventId: e.id,
            title: e.title ?? "",
            location: e.location ?? "",
            date: e.date === undefined || e.date === null || isNaN(Number(e.date)) ? "" : e.date.toISOString(),
            eventType: e.eventType ?? "Other",
            rsvp: e.rsvp ?? false,
            hidden: e.hidden ?? false,
            attendees: []
        });
        console.log(updatedEvent);

        const newEvents = [...events];
        const index = newEvents.findIndex(x => x.id === params.id);
        newEvents[index] = CreateEventItem(updatedEvent, false);
        setEvents([...newEvents.filter(x => x.isNew), ...newEvents.filter(x => !x.isNew)]);
    };

    const columns = [
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
            width: 50,
            editable: true,
        },
        {
            field: 'hidden',
            headerName: 'Hidden',
            type: "boolean",
            width: 50,
            editable: true,
        }
    ];

    const handleAddRow = function () {
        const newList = [
            {
                id: randomId(),
                title: "New Event",
                date: new Date(Enumerable.from(events)
                    .where(x => x.date !== undefined)
                    .max(x => x.date!.getTime())),
                hidden: true
            } as EventItem,
            ...events];
        setEvents(newList);
    }

    return (<div>
        <Button onClick={handleAddRow} variant="contained" sx={{my: 2}}><AddIcon/> Add Event</Button>

        <div style={{minHeight: "400px", width: '100%'}}>
            <DataGrid
                autoHeight
                rows={events}
                columns={columns}
                editMode="row"
                onRowEditStop={handleRowEditStop}
            />
        </div>
    </div>);
}

export default function EventManager() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(true);
    const [events, setEvents] = React.useState<EventItem[]>([]);

    useMountEffect(async () => {
        try {
            const events = Enumerable.from(await sessionService.getEventsAdmin())
                .select(x => CreateEventItem(x, false))
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