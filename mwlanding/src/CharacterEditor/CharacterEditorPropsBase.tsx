import {CharacterSheet} from "../Reference/CharacterSheet";

export type CharacterEditorPropsBase = {
    sheet: CharacterSheet;
    handleSheetChange: ((state: any) => void);
};
