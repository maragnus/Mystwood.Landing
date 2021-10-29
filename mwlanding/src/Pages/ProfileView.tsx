import * as React from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";

export default function ProfileView() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography variant="h6">Welcome back, Josh!</Typography>
                <TextField defaultValue="acrion@gmail.com" label="Email Address" disabled/>
                <Button>Edit Profile</Button>
            </Grid>
        </Grid>
    );
}