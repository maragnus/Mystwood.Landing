import * as React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import logo from '../logo.webp';
import sessionService, {ConfirmStatus} from "./SessionService";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

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

export default function ConfirmPage() {
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("No message");
    const [details, setDetails] = React.useState("No message");

    const email = sessionService.getEmail();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setDetails("");

        let email: string = (data.get('email') as string ?? "").trim();
        let code: string = (data.get('code') as string ?? "").trim();

        if (code.length !== 6) {
            setMessage("You didn't enter a valid code");
            setDetails("The code from your email should be exactly six (6) letters and numbers. " +
                "Please check your email and make sure you are providing the most recent code sent.");
            setOpen(true);
            return;
        }

        try {

            let status = await sessionService.confirm(email, code);

            switch (status) {
                case ConfirmStatus.Success:
                    setMessage("You are now signed in on this device.");
                    setOpen(true);
                    return;

                case ConfirmStatus.AlreadyUsed:
                    setMessage("You have already used this code.");
                    setDetails("Request a new code to continue.");
                    break;
                case ConfirmStatus.Expired:
                    setMessage("This code has expired.");
                    setDetails("You only have 15 minutes to use a code once you've requested it. Request a new code to continue.");
                    break;

                case ConfirmStatus.Invalid:
                    setMessage("This code is not valid. ")
                    setDetails("The code from your email should be exactly six (6) letters and numbers. " +
                        "Please check your email and make sure you are providing the most recent code sent.");
                    break;
            }
        }
        catch (e: any) {

            setMessage("There was network or server error. Please try again.")
            setDetails(e.toString());
        }

        setOpen(true);
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
                         style={{maxWidth: "75%", height: "auto"}}/>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Typography component="p">
                        We've emailed you a code. Please check your email and enter the code below.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            defaultValue={email}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label="Code from Email"
                            name="code"
                            autoFocus
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <NavLink to="/login">
                                    Didn't get a code?
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to="/demo">
                                    {"Enter demo mode"}
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