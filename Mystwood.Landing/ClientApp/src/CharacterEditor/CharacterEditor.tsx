import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProfileEditor from "./ProfileEditor";
import CharacterSheet from "../Reference/CharacterSheet";

import GiftsEditor from "./GiftsEditor";
import SkillsEditor from "./SkillsEditor";
import AdvEditor from "./AdvEditor";
import SpellsEditor from "./SpellsEditor";
import OtherEditor from "./OtherEditor";
import ReviewEditor from "./ReviewEditor";
import {Character} from "../Session/Session";
import sessionService from "../Session/SessionService";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import CharacterEditorModal from "./CharacterEditorModal";

enum EditorState {
    Loading = 0,
    ConfirmDraft, // Start drafting new changes?
    ConfirmContinue, // Continue your draft or start over?
    ConfirmStartOver, // Are you sure you want to start over?
    Editing
}

interface CharacterEditorProps {
    characterId: string;
}

interface CharacterEditorState {
    state: EditorState;
    activeStep: number;
    sheet: CharacterSheet;
    originalSheet: CharacterSheet;
    character?: Character;
    characterName?: string;
}

interface EditorStep {
    step: string;
    title: string;
    editor?: any;
}

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
        title: 'Skills',
        editor: SkillsEditor,
    },
    {
        step: 'Adv/Disadv',
        title: 'Advantages and Disadvantages',
        editor: AdvEditor,
    },
    {
        step: 'Spells',
        title: 'Spells',
        editor: SpellsEditor,
    },
    {
        step: 'Other',
        title: 'Other Notes',
        editor: OtherEditor,
    },
];

class CharacterEditor extends React.Component<CharacterEditorProps, CharacterEditorState> {
    constructor(props: CharacterEditorProps) {
        super(props);

        this.state = {
            state: EditorState.Loading,
            activeStep: 0,
            sheet: new CharacterSheet(),
            originalSheet: new CharacterSheet(),
        };
    }

    async componentWillUnmount() {
        // this.savePage();
        // await sessionService.updateCharacter(this.props.characterId, this.state.sheet, false);
    }

    async componentDidMount() {
        const character = await sessionService.getCharacter(this.props.characterId);

        let state: EditorState = EditorState.Loading;

        const isLive = character.live?.characterName !== undefined;
        const isDraft = character.draft?.characterName !== undefined;

        if (isLive && isDraft)
            state = EditorState.ConfirmContinue;
        else if (isLive && !isDraft)
            state = EditorState.ConfirmDraft;
        else if (!isLive)
            state = EditorState.Editing;

        const sheet = isLive ? character.live : character.draft;

        this.setState({
            ...this.state,
            state: state,
            character: character,
            characterName: sheet?.characterName,
            originalSheet: sheet,
            sheet: sheet
        });
    }

    stepRef?: any;

    savePage(): void {
        this.stepRef?.savePage();
    }

    start(state: EditorState, sheet: CharacterSheet): void {
        this.setState({
            ...this.state,
            state: state,
            sheet: {...sheet}
        });
    }

    startDraft(): void {
        this.start(EditorState.Editing, this.state.character!.live);
    }

    continueDraft(): void {
        this.start(EditorState.Editing, this.state.character!.draft);
    }

    startOverDraft(): void {
        this.start(EditorState.ConfirmStartOver, new CharacterSheet());
    }

    confirmStartOverDraft(): void {
        this.start(EditorState.Editing, this.state.character!.live);
    }

    render() {
        const characterName = this.state.characterName;

        switch (this.state.state) {
            case EditorState.Loading:
                return (<AwesomeSpinner />);
            case EditorState.ConfirmDraft:
                return (<CharacterEditorModal>
                    <p id="child-modal-description">
                        Would you like to start a new draft of changes to {characterName}?
                    </p>
                    <p>
                        Once you complete your draft, you can submit your changes for review. If approved, the draft
                        will be closed and the changes applied to your character sheet. You can pause and resume your
                        draft at any time.
                    </p>
                    <Button onClick={this.startDraft.bind(this)} variant="contained" sx={{mx: 1}}>Make Changes</Button>
                </CharacterEditorModal>);

            case EditorState.ConfirmContinue:
                return (<CharacterEditorModal>
                    <p id="child-modal-description">
                        Continue your drafted changes for {characterName}?
                    </p>
                    <p>
                        You've already started drafting changes to your character, you can continue right where you left off.
                        Once you complete your draft, you can submit your changes for review. If approved, the draft
                        will be closed and the changes applied to your character sheet
                    </p>
                    <Button onClick={this.startOverDraft.bind(this)} variant="contained" color="error" sx={{mx: 1}}>Start Over</Button>
                    <Button onClick={this.continueDraft.bind(this)} variant="contained" color="success" sx={{mx: 1}}>Continue Draft</Button>
                </CharacterEditorModal>);

            case EditorState.ConfirmStartOver:
                return (<CharacterEditorModal>
                    <p id="child-modal-description">
                        Delete your draft and start over for {characterName}?
                    </p>
                    <p>
                        You've already started drafting changes to your character. This will erase those changes and
                        you will start with fresh changes from your live character sheet.
                    </p>
                    <Button onClick={this.confirmStartOverDraft.bind(this)} variant="contained" color="error" sx={{mx: 1}}>Start Over</Button>
                    <Button onClick={this.continueDraft.bind(this)} variant="contained" color="success" sx={{mx: 1}}>Continue Draft</Button>
                </CharacterEditorModal>);
        }

        const handleNext = () => {
            this.savePage();
            this.setState((state, props) => ({activeStep: state.activeStep + 1}));
        };

        const handleBack = () => {
            this.savePage();
            this.setState((state, props) => ({activeStep: state.activeStep - 1}));
        };

        const handleReset = () => {
            this.savePage();
            this.setState(({activeStep: 0}));
        };

        const sheetChange = async (changes: object) => {
            this.setState((state: CharacterEditorState, props: CharacterEditorProps) => {
                const newSheet = {
                    ...state.sheet,
                    ...changes
                };
                CharacterSheet.populate(newSheet);
                state.sheet = newSheet;
            });

            await sessionService.updateCharacter(this.props.characterId, this.state.sheet, false);
        };

        const activeStep = this.state.activeStep;
        const ActiveStepComponent = activeStep < steps.length ? steps[activeStep].editor :
            ReviewEditor;

        return (
            <Box sx={{width: '100%'}}>
                <Typography sx={{mt: 2, mb: 1}} align="center">
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
                        <ActiveStepComponent sheet={this.state.sheet} originalSheet={this.state.originalSheet}
                                             handleSheetChange={sheetChange} ref={(page: any) => this.stepRef = page}/>
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
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>
                                Back
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}>
                                <Typography sx={{mt: 2, mb: 1}} variant="h4" align="center">{steps[activeStep].title}</Typography>
                            </Box>
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Review' : 'Next'}
                            </Button>
                        </Box>
                        <ActiveStepComponent sheet={this.state.sheet} originalSheet={this.state.originalSheet}
                                             handleSheetChange={sheetChange} ref={(page: any) => this.stepRef = page}/>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>
                                Back
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}>
                            </Box>
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