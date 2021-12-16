import * as React from "react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText, ListSubheader,
    Typography,
} from "@mui/material";
import {Event} from "../Protos/Larp";
import EventIcon from '@mui/icons-material/Event';
import {Link, NavLink, useNavigate} from "react-router-dom";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import sessionService from "../Session/SessionService";
import {useMountEffect} from "./UseMountEffect";
import Enumerable from 'linq';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PatreonLogo from '../PatreonLogo.svg';

function EventItems(props: { events: Event[] }): any {
    function getCategory(event: Event): string {
        return event.date === "" ? "General" : event.date.slice(0, 4); //new Date(event.date).getFullYear().toString();
    }

    function getLocationAvatar(event: Event): any {
        const location = event.location.toUpperCase().trim();

        if (event.title.toUpperCase().includes("PATREON"))
            return <Avatar><img src={PatreonLogo} width="80%" height="auto"/></Avatar>

        if (location === "" || location === undefined) return <Avatar><ReceiptIcon/></Avatar>;
        if (location.includes("BURGUNDAR")) return <Avatar sx={{bgcolor: "#49B661"}}>B</Avatar>;
        if (location.includes("KEEP")) return <Avatar sx={{bgcolor: "#6149B6"}}>K</Avatar>;
        if (location.includes("NOVGOROND")) return <Avatar sx={{bgcolor: "#B66149"}}>N</Avatar>;
        if (location.includes("ALBION")) return <Avatar sx={{bgcolor: "#CD7832"}}>A</Avatar>;
        return <Avatar sx={{bgcolor: "#e4dd1b"}}><EventIcon/></Avatar>;
    }

    function getLocation(event: Event): any {
        return event.location;
    }

    const groupedItems = Enumerable
        .from(props.events)
        .orderByDescending(x => x.date)
        .groupBy(event => getCategory(event))
        .orderByDescending(x => x.key())
        .toArray();

    const items = groupedItems.map((group, index) => (
        <li key={index} style={{padding: "0", margin: "0"}}>
            <ul style={{padding: "0", margin: "0"}}>
                <ListSubheader><Typography variant="h4">{group.key()}</Typography></ListSubheader>
                {group.toArray().map((event, index) =>
                    (<ListItem key={index}>
                        <ListItemButton component={Link} to={`/events/${event.eventId}`}>
                            <ListItemAvatar>
                                {getLocationAvatar(event)}
                            </ListItemAvatar>
                            <ListItemText
                                primary={<span>
                                    {event.title}
                                    <Chip component="span" sx={{float: "right"}} label={event.eventType}/>
                                </span>}
                                secondary={getLocation(event)}
                            />
                        </ListItemButton>
                    </ListItem>))}
            </ul>
            <Divider sx={{mb: 2}}/>
        </li>
    ))


    return <List sx={{position: 'relative'}}>
        {items}
        {sessionService.isAdmin() && <ListItem key={1000}>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{mb: 2}}
                component={NavLink}
                to="/events/manage"
            >
                Manage Events
            </Button>
        </ListItem>}
    </List>;
}

export default function EventList() {
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
            {!busy && <EventItems events={events}/>}
        </Container>
    );
}