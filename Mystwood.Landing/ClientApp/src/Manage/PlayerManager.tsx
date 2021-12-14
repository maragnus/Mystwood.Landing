import {useMountEffect} from "../Pages/UseMountEffect";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import * as React from "react";
import sessionService from "../Session/SessionService";
import {Profile} from "../Protos/Larp";
import {
    Avatar,
    Card,
    CardContent,
    Chip,
    Grid,
    Link, List,
    ListItem, ListItemAvatar,
    ListItemButton, ListItemText,
    Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";

export function PlayerManager(props: { playerId: number }) {
    const [busy, setBusy] = React.useState(true);
    const [profile, setProfile] = React.useState({} as Profile);

    useMountEffect(async () => {
        const pl = await sessionService.getAccount(props.playerId);
        setProfile(pl);
        setBusy(false);
    });

    if (busy) return <AwesomeSpinner/>;

    const characters = profile.characters.map((c, index) =>
        <ListItem key={index}>
            <ListItemButton component={NavLink} to={`/characters/${c.characterId}/manage`}>
                <ListItemAvatar>
                    <Avatar>
                        {c?.characterName.match(/\b([A-Z])/gi)?.join('')}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={<span>{c.characterName}
                        {c.isLive && <Chip component="span" label="Live"/>}
                        {c.isReview && <Chip component="span" label="Review"/>}
                    </span>}
                    secondary={(<span>{c.homeChapter}, {c.specialty}, Level {c.level}</span>)}
                />
            </ListItemButton>
        </ListItem>);

    return (<div>
        <Card sx={{mt: 4}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {profile.name} {profile.isAdmin && <Chip label="Admin"/>}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {profile.location}
                </Typography>
                <Typography variant="body2">
                    {profile.emails.map(x => <><Link href={`mailto:${x.email}`}>{x.email}</Link>{", "}</>)}
                    <Link href={`tel:${profile.phone}`}>{profile.phone}</Link>
                </Typography>
            </CardContent>
        </Card>

        <Grid container>
            <Grid item md={6} sm={12}>
                <List>
                    {characters}
                </List>
            </Grid>
            <Grid item md={6} sm={12}>

            </Grid>
        </Grid>
    </div>);
}