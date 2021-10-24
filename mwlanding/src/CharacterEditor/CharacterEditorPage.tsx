import {CharacterSheet} from "../Reference/CharacterSheet";
import * as React from "react";
import {ChangeEvent} from "react";

export type CharacterEditorPageProps = {
    sheet: CharacterSheet;
    handleSheetChange: ((state: any) => void);
};

export type CharacterEditorPageState = {
    sheet: CharacterSheet;
};

export abstract class CharacterEditorPage extends React.Component<CharacterEditorPageProps, CharacterEditorPageState> {
    protected constructor(props: CharacterEditorPageProps) {
        super(props);

        const newState: CharacterEditorPageState = {
            sheet: {
                ...props.sheet
            }
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

        this.props.handleSheetChange({
            [name]: value
        });
    };

    afterChange(state: CharacterEditorPageState, name?: string, value?: string): void {
    };
}