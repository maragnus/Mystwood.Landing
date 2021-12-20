import {useMountEffect} from "../Pages/UseMountEffect";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import * as React from "react";
import sessionService from "../Session/SessionService";
import {Account} from "../Protos/Larp";
import {
    Avatar, Box, Button,
    Card, CardActions,
    CardContent, Checkbox,
    Chip, FormControl, FormControlLabel,
    Grid, IconButton, Input, InputLabel,
    Link, List,
    ListItem, ListItemAvatar,
    ListItemButton, ListItemText, Stack, TextField,
    Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function AccountCard(props: { account: Account, handleEdit: () => void }) {
    const profile = props.account;

    return <Card sx={{mt: 4}}>
        <CardContent>
            <Typography variant="h5" component="div">
                {profile.name} {profile.isAdmin && <Chip label="Admin"/>}
            </Typography>
            <Typography variant="subtitle1" sx={{mb: 1.5}} color="text.secondary">
                {profile.location}
            </Typography>
            <Typography variant="body2">
                {profile.emails.map(x => <><Link href={`mailto:${x.email}`}>{x.email}</Link>{", "}</>)}
                <Link href={`tel:${profile.phone}`}>{profile.phone}</Link>
            </Typography>
            <Typography variant="body1" sx={{mb: 1.5}}>
                <p>Registered on {profile.created}</p>
                <p>{profile.notes}</p>
            </Typography>
        </CardContent>
        <CardActions>
            <Button variant="outlined" onClick={() => props.handleEdit()}>Edit</Button>
        </CardActions>
    </Card>
}

function AccountEditor(props: { account: Account, handleClose: () => void }) {
    const [busy, setBusy] = React.useState(false);
    const [profile, setProfile] = React.useState(props.account);

    const removeEmail = (email: string) => {
        const newProfile = {...profile};
        newProfile.emails = newProfile.emails.filter(x => x.email !== email);
        setProfile(newProfile);
    };

    const handleSubmit = async () => {
        setBusy(true);
    };

    return <Card component="form" onSubmit={handleSubmit}
                 sx={{mt: 4}}
                 noValidate autoComplete="off">
        <CardContent>
            <Stack direction="row" spacing={2} sx={{mt: 2}}>
            <TextField name="name" label="Player Full Name" defaultValue={profile.name} variant="standard"/>
                    <TextField name="phone" label="Phone Number" placeholder="+12075551234" defaultValue={profile.phone}
                               variant="standard"/>
                    <TextField name="location" label="Location" placeholder="City, Sate" defaultValue={profile.phone}
                               variant="standard"/>
            </Stack>
            <Box sx={{mt: 2}}>
                <FormControl fullWidth variant="standard">
                    <InputLabel placeholder="Allergies, Sensitivities, Other Information">Notes</InputLabel>
                    <Input name="notes"
                        multiline
                        defaultValue={""}
                    />
                </FormControl>
            </Box>
            <Box sx={{mt: 2}}>
                {profile.emails.map(x => (
                    <span>
                        <TextField name="email" label="Email" defaultValue={x.email} variant="standard"/>
                        <IconButton disabled={busy} sx={{mt: 3}} onClick={(e) => {
                            e.preventDefault();
                            removeEmail(x.email)
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                        </span>))}
                <TextField name="addEmail" label="Add Email" variant="standard"/>
            </Box>
            <Stack direction="row" spacing={2} sx={{mt: 2}}>
                <FormControlLabel control={<Checkbox defaultChecked={profile.isAdmin}/>} label="Admin"/>
                <FormControlLabel control={<Checkbox defaultChecked/>} label="Enabled"/>
            </Stack>
            <Stack direction="row" spacing={2} sx={{mt: 2}}>
                <Button variant="contained" type="submit" disabled={busy}>Save</Button>
                <Button color="error" variant="outlined" disabled={busy} onClick={(e) => {
                    e.preventDefault();
                    props.handleClose();
                }}>Cancel</Button>
            </Stack>
        </CardContent>
    </Card>;
}

export function PlayerManager(props: { playerId: number }) {
    const [busy, setBusy] = React.useState(true);
    const [editing, setEditing] = React.useState(false);
    const [profile, setProfile] = React.useState({} as Account);

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

    const closeEditor = async () => {
        setEditing(false);
        setBusy(true);
        const pl = await sessionService.getAccount(props.playerId);
        setProfile(pl);
        setBusy(false);
    }

    return (<div>
        {!editing && <AccountCard account={profile} handleEdit={() => setEditing(true)}/>}
        {editing && <AccountEditor account={profile} handleClose={() => closeEditor()}/>}

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