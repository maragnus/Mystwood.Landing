import {Character, CharacterStatus} from "./Session";
import {larpClient} from "./LarpService";
import {
    CharacterResponse,
    CharacterSummary as LarpCharacterSummary,
    Profile,
    ValidationResponseCode
} from "../Protos/Larp";
import CharacterSheet from "../Reference/CharacterSheet";
import {HomeChaptersByName} from "../Reference/HomeChapter";

export interface SessionCallback {
    callback: (() => void);
    subscription: number;
}

export interface AccountProfile {
    name: string;
    location?: string;
    phone?: string;
    email: string[];
}

export enum LoginStatus {
    Success,
    Blocked,
    Failed
}

export enum ConfirmStatus {
    Success,
    AlreadyUsed,
    Expired,
    Invalid
}

export interface CharacterSummary {
    id: string;
    name: string;
    player: string,
    status: CharacterStatus,
    summary: string;
}

export class SessionService {
    private _callbacks: SessionCallback[] = [];
    private _nextSubscriptionId: number = 0;
    private _email?: string;
    private _sessionId?: string;

    private static readonly SessionIdKey = "MWL_SESSION_ID";
    private static readonly ProfileKey = "MWL_PROFILE";

    constructor() {
        const sessionId = localStorage.getItem(SessionService.SessionIdKey) ?? "";
        if (sessionId !== undefined)
            this._sessionId = sessionId;

        this.startInterval();
    }

    startInterval() {
        // Make sure that all sessions identify if we are signed out
        setInterval(function () {
            let sessionId: string | undefined = localStorage.getItem(SessionService.SessionIdKey) ?? "";
            if (sessionId === "") sessionId = undefined;

            if (sessionId !== sessionService._sessionId)
                sessionService.updateState(sessionId);
        }, 1000);
    }

    getEmail(): string | undefined {
        return this._email;
    }

    async listCharacters(): Promise<Character[]> {
        return [];
    }

    isAuthenticated(): boolean {
        return this._sessionId !== undefined;
    }

    async getUser() {
        return null;
    }

    updateState(sessionId?: string): void {
        this._sessionId = sessionId;
        localStorage.setItem(SessionService.SessionIdKey, sessionId ?? "");
        this.notifySubscribers();
    }

    subscribe(callback: (() => void)): number {
        this._callbacks.push({callback, subscription: this._nextSubscriptionId++});
        return this._nextSubscriptionId - 1;
    }

    unsubscribe(subscriptionId?: number): void {
        if (subscriptionId === undefined)
            return;

        const subscriptionIndex = this._callbacks
            .map((element, index) => element.subscription === subscriptionId ? {
                found: true,
                index: index
            } : {found: false, index: 0})
            .filter(element => element.found);

        if (subscriptionIndex.length !== 1)
            throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);

        this._callbacks.splice(subscriptionIndex[0].index, 1);
    }

    notifySubscribers(): void {
        for (let i = 0; i < this._callbacks.length; i++) {
            const callback = this._callbacks[i].callback;
            callback();
        }
    }

    getProfile(): Profile {
        const profileJson = localStorage.getItem(SessionService.ProfileKey) ?? "{}";
        return JSON.parse(profileJson) as Profile;
    }

    private static parseProfile(profile?: Profile) {
        localStorage.setItem(SessionService.ProfileKey, JSON.stringify(profile));
    }

    async fetchProfile(): Promise<Profile> {
        if (this._sessionId === undefined) {
            return this.getProfile();
        }

        try {
            const response = await larpClient.GetProfile({session: {sessionId: this._sessionId}});
            SessionService.parseProfile(response.profile);

            this.notifySubscribers();

            return this.getProfile();
        } catch {
            return this.getProfile();
        }
    }

    async setName(newValue: string) {
        const response = await larpClient.SetProfileName({session: {sessionId: this._sessionId}, value: newValue});
        SessionService.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async setLocation(newValue: string) {
        const response = await larpClient.SetProfileLocation({session: {sessionId: this._sessionId}, value: newValue});
        SessionService.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async setPhone(newValue: string) {
        const response = await larpClient.SetProfilePhone({session: {sessionId: this._sessionId}, value: newValue});
        SessionService.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async addEmail(newEmail: string) {
        const response = await larpClient.AddProfileEmail({session: {sessionId: this._sessionId}, value: newEmail});
        SessionService.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async removeEmail(exisingEmail: string) {
        const response = await larpClient.RemoveProfileEmail({
            session: {sessionId: this._sessionId},
            value: exisingEmail
        });
        SessionService.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async logout(): Promise<boolean> {
        // TODO -- Send logout rpc
        this.updateState(undefined);
        return true;
    }

    async login(email: string): Promise<LoginStatus> {
        this._email = email;
        const result = await larpClient.InitiateLogin({email: email});
        switch (result.statusCode) {
            case ValidationResponseCode.SUCCESS:
                return LoginStatus.Success;
            default:
                return LoginStatus.Failed;
        }
    }

    async confirm(email: string, code: string): Promise<ConfirmStatus> {
        const result = await larpClient.ConfirmLogin({email: email, code: code});
        switch (result.statusCode) {
            case ValidationResponseCode.SUCCESS:
                SessionService.parseProfile(result.profile);
                this.updateState(result.session?.sessionId);
                return ConfirmStatus.Success;
            case ValidationResponseCode.EXPIRED:
                return ConfirmStatus.Expired;
            default:
                return ConfirmStatus.Invalid
        }
    }

    static get instance(): SessionService {
        return sessionService
    }

    async createCharacter(characterName: string, homeChapter: string): Promise<Character> {
        const result = await larpClient.CreateCharacterDraft({
            session: {sessionId: this._sessionId},
            characterName: characterName,
            homeChapter: homeChapter
        });
        return SessionService.toCharacter(result);
    }

    async getCharacter(id: string): Promise<Character> {
        const result = await larpClient.GetCharacter({session: {sessionId: this._sessionId}, characterId: id});
        return SessionService.toCharacter(result);
    }

    async updateCharacter(id: string, draft: CharacterSheet): Promise<Character> {
        const sheet = {...draft};
        CharacterSheet.unpopulate(sheet);

        const result = await larpClient.UpdateCharacterDraft({
            session: {sessionId: this._sessionId},
            characterId: id,
            draftJson: JSON.stringify(sheet)
        });

        return SessionService.toCharacter(result);
    }

    async updateInReview(id: string, isReview: boolean): Promise<Character> {
        const result = await larpClient.UpdateCharacterInReview({
            session: {sessionId: this._sessionId},
            characterId: id,
            isReview: isReview
        });

        return SessionService.toCharacter(result);
    }

    private static toCharacter(result: CharacterResponse) {
        const emptySheet = new CharacterSheet();

        let state: CharacterStatus;
        if (result.character!.isReview)
            state = CharacterStatus.Review;
        else if (result.character!.isLive)
            state = CharacterStatus.New;
        else
            state = CharacterStatus.Live;

        return {
            id: result.character?.characterId,
            draft: {...emptySheet, ...JSON.parse(result.character?.draftJson ?? "{}")},
            live:  {...emptySheet, ...JSON.parse(result.character?.liveJson ?? "{}")},
            status: state
        } as Character;
    }

    async getCharacters(): Promise<CharacterSummary[]> {
        const result = await larpClient.GetCharacters({session: {sessionId: this._sessionId}});
        return result.characters.map(x => SessionService.buildCharacter(x));
    }

    private static buildCharacter(x: LarpCharacterSummary): CharacterSummary {
        let state: CharacterStatus;
        if (x.isReview)
            state = CharacterStatus.Review;
        else if (!x.isLive)
            state = CharacterStatus.New;
        else
            state = CharacterStatus.Live;

        const homeChapter = HomeChaptersByName(x.homeChapter);
        return {
            id: x.characterId,
            name: x.characterName ?? "Unnamed",
            player: x.accountName,
            status: state,
            summary: `${homeChapter.title}, ${x.specialty}, Level ${x.level}`
        } as CharacterSummary
    }

    isAdmin(): boolean {
        return this.getProfile().isAdmin;
    }

    async searchCharacters(query: string): Promise<CharacterSummary[]> {
        const result = await larpClient.SearchCharacters({session: {sessionId: this._sessionId}, query: query});
        return result.characters.map(x => SessionService.buildCharacter(x));
    }

    async searchAccounts(query: string): Promise<Profile[]> {
        const result = await larpClient.SearchAccounts({session: {sessionId: this._sessionId}, query: query});
        return result.profiles;
    }

    async getAccount(accountId: number): Promise<Profile> {
        const result = await larpClient.GetAccount({session: {sessionId: this._sessionId}, accountId: accountId});
        return result.profile!;
    }
}

const sessionService: SessionService = new SessionService();

export default sessionService;
