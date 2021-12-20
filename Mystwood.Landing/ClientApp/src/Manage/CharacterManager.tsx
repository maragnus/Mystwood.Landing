import {useMountEffect} from "../Pages/UseMountEffect";
import AwesomeSpinner from "../Common/AwesomeSpinner";
import * as React from "react";
import sessionService from "../Session/SessionService";
import { Character } from "../Session/Session";

export function CharacterManager(props: { characterId: string }) {
    const [busy, setBusy] = React.useState(true);
    const [character, setCharacter] = React.useState({} as Character);

    useMountEffect(async () => {
        const ch = await sessionService.getCharacter(props.characterId);
        setCharacter(ch);
        setBusy(false);
    });

    if (busy) return <AwesomeSpinner/>;

    return (<div></div>);
}