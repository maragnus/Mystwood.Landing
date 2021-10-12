import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProfileEditor from "./ProfileEditor";
import {CharacterSheet} from "./CharacterSheet";

import './CharacterEditor.css';
import GiftsEditor from "./GiftsEditor";

type CharacterEditorProps = {};

type CharacterEditorState = {
    activeStep: number;
    sheet: CharacterSheet;
};

type EditorStep = {
    step: string;
    title: string;
    editor?: any;
};

const steps: EditorStep[] = [
    {
        step: 'Profile',
        title: 'Character Profile',
        editor: ProfileEditor,
    },
    {
        step: 'Gifts',
        title: 'Gifts and Abilities',
        editor: GiftsEditor,
    },
    {
        step: 'Skills',
        title: 'Free and Purchased Skills',
        editor: ProfileEditor,
    },
    {
        step: 'Adv/Disadv',
        title: 'Advantages and Disadvantages',
        editor: GiftsEditor,
    },
    {
        step: 'Spells',
        title: 'Spells',
        editor: GiftsEditor,
    },
    {
        step: 'Other',
        title: 'Unusual Features, Cures, Documents, Notes',
        editor: GiftsEditor,
    },
];

class CharacterEditor extends React.Component<CharacterEditorProps, CharacterEditorState> {
    constructor(props: CharacterEditorProps) {
        super(props);
        this.state = {
            activeStep: 0,
            sheet: {
                characterName: 'Niko Atkinson',
                religions: ['wild'],
                occupation: '6164ced9be316488997a8274',
                enhancement: undefined,
                home: 'burgundar',
                privateStory: '',
                publicStory: '',
                notes: ''
            }
        };
    }

    render() {
        const handleNext = () => {
            this.setState((state, props) => ({activeStep: state.activeStep + 1}));
        };

        const handleBack = () => {
            this.setState((state, props) => ({activeStep: state.activeStep - 1}));
        };

        const handleReset = () => {
            this.setState(({activeStep: 0}));

        };

        const sheetChange = (changes: object) => {
            this.setState((state, props) => ({sheet: {...state.sheet, ...changes}}));
        };

        const activeStep = this.state.activeStep;
        const ActiveStepComponent = steps[activeStep].editor

        return (
            <Box sx={{width: '100%'}}>
                <Typography sx={{mt: 2, mb: 1}}>
                    Drafting changes to <strong>Niko Atkinson</strong>
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label.step} {...stepProps}>
                                <StepLabel {...labelProps}>{label.step}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    // Review Step
                    <React.Fragment>
                        <Typography sx={{mt: 2, mb: 1}}>
                            Please carefully review your changes before submitting.
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button color="inherit" onClick={handleBack} sx={{mr: 1}}>
                                Back
                            </Button>
                            <Button color="inherit" onClick={handleReset} sx={{mr: 1}}>
                                Start Over
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button onClick={handleReset}>Submit Changes</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    // Editor Step
                    <React.Fragment>
                        <Typography sx={{mt: 2, mb: 1}} variant="h4">{steps[activeStep].title}</Typography>
                        <ActiveStepComponent sheet={this.state.sheet} handleSheetChange={sheetChange}/>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                Back
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Review' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        );
    }
}

export default CharacterEditor;