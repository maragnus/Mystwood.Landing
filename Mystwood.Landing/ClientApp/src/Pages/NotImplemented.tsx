import * as React from "react";
import {Alert, AlertTitle, Container, Typography} from "@mui/material";

export default function NotImplemented(props: { title: string }) {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{my: 2}} align="center">{props.title}</Typography>

            <Alert severity="warning">
                <AlertTitle>Not Implemented</AlertTitle>
                The {props.title} area has not been implemented yet.
            </Alert>
        </Container>
    );
}