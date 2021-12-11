import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import logo from '../logo.webp';
import sessionService, {LoginStatus} from "./SessionService";
import {NavLink, useNavigate} from "react-router-dom";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {BusyButton} from "../Common/BusyButton";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mystwood.org/">
                Mystwood Landing
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const theme = createTheme();

export default function LoginPage() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("No message");
    const [details, setDetails] = React.useState("No message");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setBusy(true);

        setDetails("");

        let email: string = (data.get('email') as string ?? "").trim();

        if (email.length < 7) {
            setMessage("You must enter a valid email address");
            setDetails("Please provide your email address to get a code to sign in.");
            setOpen(true);
            setBusy(false);
            return;
        }

        try {
            let status = await sessionService.login(email);

            switch (status) {
                case LoginStatus.Success:
                    setBusy(false);
                    navigate("/confirm");
                    return;

                case LoginStatus.Blocked:
                    setMessage("This email has been blocked.");
                    setDetails("The email address you provided cannot be used with this website.");
                    break;

                default:
                    setMessage("Unable to sign in at this time.")
                    setDetails("We're not sure what went wrong. Please try a different email address.");
                    break;
            }
        } catch (e: any) {
            setMessage("There was network or server error. Please try again.")
            setDetails(e.toString());
        }
        finally {
            setBusy(false);
            setOpen(true);
        }
    };

    async function handleClose() {
        setOpen(false);
        if (await sessionService.isAuthenticated()) {
            navigate("/");
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <img src={logo} alt="Mystwood Logo"
                         style={{maxWidth: "100%", height: "auto"}}/>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1, width: "100%"}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <BusyButton label="Sign In or Register" busy={busy} />
                        <Grid container>
                            <Grid item xs>
                                <NavLink to="/confirm">
                                    <Typography variant="body2">I already have a code</Typography>
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to="/demo">
                                    <Typography variant="body2">Enter demo mode</Typography>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Login"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Typography variant="body1" mb={2}>
                                {message}
                            </Typography>
                            <Typography variant="body2">
                                {details}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
}