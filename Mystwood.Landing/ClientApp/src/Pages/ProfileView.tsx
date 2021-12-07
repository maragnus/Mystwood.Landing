import * as React from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Container,
    Button,
    List,
    ListItem,
    IconButton,
    ListItemText,
    Alert, AlertTitle
} from "@mui/material";
import sessionService from "../Session/SessionService";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function tabProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function EditProfile() {
    let profile = sessionService.getProfile();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let name: string = (data.get('name') as string ?? "").trim();
        let location: string = (data.get('location') as string ?? "").trim();
        let phone: string = (data.get('phone') as string ?? "").trim();

        try {
            await sessionService.setName(name);
            await sessionService.setLocation(location);
            await sessionService.setPhone(phone);
        }
        catch (e: any) {
            alert(e);
        }

        profile = sessionService.getProfile();
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                defaultValue={profile.name}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                autoComplete="street-address"
                autoFocus
                defaultValue={profile.location}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="tel"
                autoFocus
                defaultValue={profile.phone}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Save
            </Button>
        </Box>
    );
}


function EditEmail() {
    const [profile, setProfile] = React.useState(sessionService.getProfile());

    async function remove(email: string) {
        try {
            await sessionService.removeEmail(email);
        }
        catch (e: any) {
            alert(e);
        }
        setProfile(sessionService.getProfile());
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let email: string = (data.get('email') as string ?? "").trim();

        try {
            await sessionService.addEmail(email);
        }
        catch (e: any) {
            alert(e);
        }
        setProfile(sessionService.getProfile());
    }

    const addresses = profile.email.map(email => (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => remove(email)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText primary={email} secondary="Unverified" />
        </ListItem>
    )) ;

    return (
        <Box>
            <List>
            { addresses }
            </List>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Add Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add
                </Button>
            </Box>
        </Box>
    );
}

export default function ProfileView() {
    let navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    async function logout() {
        await sessionService.logout();
        navigate("/");
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{mt: 2}} align="center">Your Profile</Typography>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Profile" {...tabProps(0)} />
                <Tab label="Email" {...tabProps(1)} />
                <Tab label="Attendance" {...tabProps(2)} />
                <Tab label="Two-factor" {...tabProps(3)} />
                <Tab label="Personal data" {...tabProps(4)} />
                <Button variant="contained" onClick={logout} sx={{mt:2, mx:1}}>Logout</Button>
            </Tabs>
            <TabPanel value={value} index={0}>
                <Typography variant="h5" sx={{my: 2}} align="center">Personal Profile</Typography>

                <EditProfile />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h5" sx={{my: 2}} align="center">Authorized Emails</Typography>

                <EditEmail />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography variant="h5" sx={{my: 2}} align="center">Event Attendance</Typography>

                <Alert severity="warning">
                    <AlertTitle>Not Implemented</AlertTitle>
                    This area has not been implemented yet.
                </Alert>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Typography variant="h5" sx={{my: 2}} align="center">Two-factor</Typography>

                <Alert severity="warning">
                    <AlertTitle>Not Implemented</AlertTitle>
                    This area has not been implemented yet.
                </Alert>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Typography variant="h5" sx={{my: 2}} align="center">Personal data</Typography>

                <Alert severity="warning">
                    <AlertTitle>Not Implemented</AlertTitle>
                    This area has not been implemented yet.
                </Alert>
            </TabPanel>
            </Box>
        </Container>
    );
}