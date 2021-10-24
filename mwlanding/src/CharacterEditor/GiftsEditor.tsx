import {CharacterEditorPropsBase} from "./CharacterEditorPropsBase";
import {Box, Grid, Rating, Typography} from "@mui/material";
import * as React from "react";
import {CharacterSheet} from "../Reference/CharacterSheet";

type GiftEditorState = {
    sheet: CharacterSheet;
};


export default class GiftsEditor extends React.Component<CharacterEditorPropsBase, GiftEditorState> {
    constructor(props: CharacterEditorPropsBase) {
        super(props);
        this.state = {
            sheet: props.sheet
        };
    };

    handleChange(name: string, value: string) {
        this.setState({
            sheet: {
                ...this.state.sheet,
                [name]: value
            }
        });
        // Where do I call CharacterSheet.populate(this.state.sheet | newSheet)
        this.props.handleSheetChange({
            [name]: value
        })
    };

    render() {
        return <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Box>Courage {this.state.sheet.courage}</Box>
                    <Rating
                        name="courage"
                        value={this.state.sheet.courage}
                        precision={1}
                        max={10}
                        onChange={(e, value?: any) => this.handleChange("courage", value ?? 0)}
                        getLabelText={(value: number) => `${value} Level${value !== 1 ? 's' : ''}`}
                    />
                </Grid>
            </Grid>
        </Box>;
    }
}