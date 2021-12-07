import {Paper, styled} from "@mui/material";
import React from "react";

export const SkillListItem = styled('li')(({theme}) => ({
    margin: theme.spacing(0.5),
}));

export const SkillList = function (props: { body: any[] }) {
    return <Paper
        sx={{
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 1.5,
            mx: 0,
            my: 2,
        }}
        component="ul">
        {props.body.map((v, index) => <SkillListItem key={index}>{v}</SkillListItem>)}
    </Paper>
}