import {Character} from "./Session";

export class SessionManager {
    characters: Character[] = [];

    async listCharacters(): Promise<Character[]> {
        return [];
    }
}

const sessionManager: SessionManager = new SessionManager();

export default sessionManager;
