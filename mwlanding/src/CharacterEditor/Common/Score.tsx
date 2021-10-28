// Displays a circled number with title
import * as React from "react";
import {Avatar, Box, Typography} from "@mui/material";

export const Score = React.forwardRef(function Score(props: { label: string, value: number, delta?: boolean }, ref: any) {
    return <Box {...props}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 0.5,
                    px: 2
                }}
                component="div" ref={ref}>
        <Avatar>{props.delta && props.value >= 0 ? "+" + props.value : props.value}</Avatar>
        <Typography variant="h6">{props.label}</Typography>
    </Box>;
});