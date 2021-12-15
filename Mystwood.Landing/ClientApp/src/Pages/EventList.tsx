import * as React from "react";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import {  Event } from "../Protos/Larp";
import EventIcon from '@mui/icons-material/Event';
import CreateIcon from '@mui/icons-material/Create';
import {Link, NavLink, useNavigate} from "react-router-dom";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import sessionService from "../Session/SessionService";
import {useMountEffect} from "./UseMountEffect";

function EventItems(props: { events: Event[] }): any {
    const navigate = useNavigate();

    const handleNew = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/events/new");
        return;
    }

    const items = props.events.map((c, index) =>
        <ListItem key={index} secondaryAction={
            <Button startIcon={<CreateIcon/>} component={Link} to={`/events/${c.eventId}/manage`}>
                Edit
            </Button>
        }>
            <ListItemButton component={Link} to={`/events/${c.eventId}`}>
                <ListItemAvatar>
                    <Avatar>
                        <EventIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={c.title}
                    secondary={(<Box component="span">{c.location} <Chip component="span" label={c.eventType}/></Box>)}
                />
            </ListItemButton>
        </ListItem>);

    return <List>
        {items}
        {sessionService.isAdmin() && <ListItem key={1000}>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{mb: 2}}
                component={NavLink}
                to="/events/new"
            >
                Add Event
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
        }
        catch (e) {
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