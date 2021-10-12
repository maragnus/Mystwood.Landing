import {CharacterSheet} from "./CharacterSheet";

export type CharacterEditorPropsBase = {
    sheet: CharacterSheet;
    handleSheetChange: ((state: any) => void);
};
