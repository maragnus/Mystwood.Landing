import {CharacterSheet} from "../Reference/CharacterSheet";
import * as React from "react";
import {ChangeEvent} from "react";

export interface CharacterEditorPageProps {
    sheet: CharacterSheet;
    originalSheet: CharacterSheet;
    handleSheetChange: ((state: any) => void);
}

export interface CharacterEditorPageState {
    sheet: CharacterSheet;
    activeChildStep: number;
}

export abstract class CharacterEditorPage extends React.Component<CharacterEditorPageProps, CharacterEditorPageState> {
    protected changes: any = {};

    protected constructor(props: CharacterEditorPageProps) {
        super(props);

        const newState: CharacterEditorPageState = {
            sheet: {
                ...props.sheet
            },
            activeChildStep: 0,
        };
        this.afterChange(newState, undefined, undefined);

        this.state = newState;
    };

    handleInputChange(event: ChangeEvent): void {
        const target: any = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.handleChange(name, value);
    }

    handleChange(name: string, value: any): void {
        const newState: CharacterEditorPageState = {
            ...this.state,
            sheet: {
                ...this.state.sheet,
                [name]: value
            }
        };

        this.afterChange(newState, name, value);

        this.setState(newState);

        this.changes[name] = value;
    };

    afterChange(state: CharacterEditorPageState, name?: string, value?: string): void {
    };

    savePage(): void {
        this.props.handleSheetChange(this.changes);
        this.changes = {}
    }

    componentWillUnmount() {
        this.savePage();
    }
}