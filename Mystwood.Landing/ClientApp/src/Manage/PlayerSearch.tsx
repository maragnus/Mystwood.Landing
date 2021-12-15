import * as React from "react";
import sessionService from "../Session/SessionService";
import {useMountEffect} from "../Pages/UseMountEffect";
import {
    Alert,
    Avatar, Box, Chip,
    Container, IconButton, InputBase, List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText, Paper, Tooltip,
    Typography
} from "@mui/material";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {Account} from "../Protos/Larp";

function PlayerItems(props: { items: Account[] }): any {
    const items = props.items.map((c, index) =>
        <ListItem key={index}>
            <Tooltip title={`${c.emails.map(x => x.email).join(", ")}, ${c.phone}, ${c.location}`}>
                <ListItemButton component={Link} to={`/players/${c.accountId}`}>
                    <ListItemAvatar>
                        <Avatar>
                            {c?.name.match(/\b([A-Z])/gi)?.join('')}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<span>{c.name} {c.isAdmin ? <Chip component="span" label="admin"/> : null}</span>}
                        secondary={c.characters.map(x => `${x.characterName} (${x.homeChapter})`).join(", ")}
                    />
                </ListItemButton>
            </Tooltip>
        </ListItem>);

    if (items.length === 0) {
        items.push(<Alert severity="info">No players found</Alert>)
    }

    return <List>
        {items}
    </List>;
}

export default function PlayerSearch() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(true);
    const [players, setPlayers] = React.useState<Account[]>([]);
    const [query, setQuery] = React.useState<string>("");

    useMountEffect(async () => {
        try {
            const players = await sessionService.searchAccounts("");
            setPlayers(players);
        } catch (e) {
            alert(e);
            navigate("/login");
        }
        setBusy(false);
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let q: string = (data.get('q') as string ?? "").trim();

        setQuery(q.toUpperCase());
    };

    const filteredPlayers =
        players
            .filter(x => x.name.toUpperCase().includes(query)
                || x.characters.some(x => x.characterName.toUpperCase().includes(query))
                || x.emails.some(x => x.email.toUpperCase().includes(query))
            );

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{mt: 2}} align="center">Search Players</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Paper sx={{mt: 4, p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}>
                    <InputBase sx={{ml: 1, flex: 1}} placeholder="Email, Player Name, Character Name" name="q" autoFocus/>
                    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </Box>
            {busy && <AwesomeSpinner/>}
            {!busy && <PlayerItems items={filteredPlayers}/>}
        </Container>
    );
}