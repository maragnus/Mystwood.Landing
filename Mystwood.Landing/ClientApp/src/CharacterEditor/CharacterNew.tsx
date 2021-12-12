import * as React from 'react';
import {Container, Autocomplete, Box, Typography, TextField} from "@mui/material";
import {HomeChapters} from "../Reference/HomeChapter";
import {BusyButton} from "../Common/BusyButton";
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import logo from '../logo.webp';
import {useNavigate} from "react-router-dom";
import sessionService from "../Session/SessionService";

const theme = createTheme();

export default function CharacterNew() {
    const navigate = useNavigate();
    const [busy, setBusy] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setBusy(true);

        const name: string = (data.get('characterName') as string ?? "").trim();
        const home: string = (data.get('home') as string ?? "").trim();
        const homeChapter: string | undefined = HomeChapters.find(x => x.title === home)?.name;

        if (name.length < 3 || homeChapter === undefined) {
            alert("Please populate all fields to continue." + homeChapter);
            setBusy(false);
            return;
        }

        try {
            let character = await sessionService.createCharacter(name, home);

            navigate("/characters/" + character.id + "/draft");

        } catch (e: any) {
            alert(e.toString());
        } finally {
            setBusy(false);
        }
    };

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
                        Create a new character
                    </Typography>
                    <Typography component="p" variant="body1" sx={{mt: 4}}>
                        Choose a name and the home chapter of your new character to start. You can change
                        these later.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 4, width: "100%"}}>
                        <TextField id="characterName" name="characterName"
                                   fullWidth required aria-required={true}
                                   label="Character Name" variant="standard" autoFocus
                        />
                        <Autocomplete
                            id="home"
                            options={HomeChapters} aria-required={true} sx={{mt: 4, width: "100%"}}
                            getOptionLabel={(option) => option.title ?? ""}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Home Chapter"
                                    name="home"
                                />
                            )}
                        />

                        <BusyButton label="Create Character" busy={busy}/>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}