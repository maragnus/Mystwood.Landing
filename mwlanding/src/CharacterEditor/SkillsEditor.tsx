import React from 'react';
import {Box, Tab} from "@mui/material";
import {CharacterEditorPage, CharacterEditorPageState} from "./CharacterEditorPage";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {OccupationSkillsEditor} from "./Skills/OccupationSkillsEditor";
import {PurchasedSkillsEditor} from "./Skills/PurchasedSkillsEditor";
import {SkillsSummary} from "./Skills/SkillsSummary";
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default class SkillsEditor extends CharacterEditorPage {
    tabRefs: any[] = [undefined, undefined, undefined];

    handleTabChange(event: React.SyntheticEvent, newValue: string) {
        this.savePage();
        this.setState({
            ...this.state,
            activeChildStep: newValue,
        })
    }

    savePage() {
        this.tabRefs.forEach(tab => tab?.savePage());
        super.savePage();
    }

    render() {
        const activeChildStep = (this.state.activeChildStep === undefined) ? "0" : this.state.activeChildStep;

        const sheetChange = (changes: object) => {
            this.props.handleSheetChange(() => this.props.handleSheetChange(changes));
            this.setState((state: CharacterEditorPageState) => {
                const newSheet = {
                    ...state.sheet,
                    ...changes
                };
                state.sheet = newSheet;
            });
        };

        return <Box component="form">
            <TabContext value={activeChildStep}>
                <TabList onChange={(e, v) => this.handleTabChange(e, v)} variant="fullWidth">
                    <Tab icon={<WorkIcon/>} label="Occupation Skills" value="0"/>
                    <Tab icon={<MonetizationOnIcon/>} label="Purchased Skills" value="1"/>
                    <Tab icon={<ListAltIcon/>} label="Skills Summary" value="2"/>
                </TabList>

                <TabPanel value="0">
                    <OccupationSkillsEditor
                        ref={(tab: any) => this.tabRefs[1] = tab}
                        sheet={this.state.sheet}
                        originalSheet={this.props.originalSheet}
                        handleSheetChange={sheetChange.bind(this)}/>
                </TabPanel>

                <TabPanel value="1">
                    <PurchasedSkillsEditor
                        ref={(tab: any) => this.tabRefs[1] = tab}
                        sheet={this.state.sheet}
                        originalSheet={this.props.originalSheet}
                        handleSheetChange={sheetChange.bind(this)}/>
                </TabPanel>

                <TabPanel value="2">
                    <SkillsSummary
                        ref={(tab: any) => this.tabRefs[2] = tab}
                        sheet={this.state.sheet}
                        originalSheet={this.props.originalSheet}
                        handleSheetChange={sheetChange.bind(this)}/>
                </TabPanel>
            </TabContext>
        </Box>;
    }
}