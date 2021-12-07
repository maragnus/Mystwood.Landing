import {Character} from "./Session";
import {larpClient} from "./LarpService";
import {Profile, ValidationResponseCode} from "../Protos/Larp";

export interface SessionCallback {
    callback: (() => void);
    subscription: number;
}

export interface AccountProfile {
    name: string;
    location?: string;
    phone?: string;
    email: string[];
};

export enum LoginStatus {
    Success,
    Blocked,
    Failed
}

export enum ConfirmStatus {
    Success ,
    AlreadyUsed,
    Expired,
    Invalid
}

export class SessionService {
    private _characters: Character[] = [];
    private _callbacks: SessionCallback[] = [];
    private _nextSubscriptionId: number = 0;
    private _email?: string;
    private _sessionId?: string;
    private _profile: AccountProfile = { name: "Undefined", email: [] };

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
        setInterval(function() {
            let sessionId: string | undefined = localStorage.getItem(SessionService.SessionIdKey) ?? "";
            if (sessionId == "") sessionId = undefined;

            if (sessionId != sessionService._sessionId)
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
        this._callbacks.push({ callback, subscription: this._nextSubscriptionId++ });
        return this._nextSubscriptionId - 1;
    }

    unsubscribe(subscriptionId?: number): void {
        if (subscriptionId === undefined)
            return;

        const subscriptionIndex = this._callbacks
            .map((element, index) => element.subscription === subscriptionId ? { found: true, index: index } : { found: false, index: 0 })
            .filter(element => element.found === true);

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

    getProfile(): AccountProfile {
        const profileJson = localStorage.getItem(SessionService.ProfileKey) ?? "{}";
        return JSON.parse(profileJson);
    }

    private parseProfile(profile?: Profile) {
        const p = {
            name: profile?.name ?? "Undefined",
            location: profile?.location,
            phone: profile?.phone,
            email: profile?.emails.map(x => x.email) ?? []
        };
        localStorage.setItem(SessionService.ProfileKey, JSON.stringify(p));
    }

    async fetchProfile(): Promise<AccountProfile> {
        if (this._sessionId === undefined) {
            return this.getProfile();
        }

        try {
            const response = await larpClient.GetProfile({session: {sessionId: this._sessionId}});
            this.parseProfile(response.profile);

            this.notifySubscribers();

            return this.getProfile();
        }
        catch {
            return this.getProfile();
        }
    }

    async setName(newValue: string) {
        const response = await larpClient.SetProfileName({ session: {sessionId: this._sessionId}, value: newValue });
        this.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async setLocation(newValue: string) {
        const response = await larpClient.SetProfileLocation({ session: {sessionId: this._sessionId}, value: newValue });
        this.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async setPhone(newValue: string) {
        const response = await larpClient.SetProfilePhone({ session: {sessionId: this._sessionId}, value: newValue });
        this.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async addEmail(newEmail: string) {
        const response = await larpClient.AddProfileEmail({ session: {sessionId: this._sessionId}, value: newEmail });
        this.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async removeEmail(exisingEmail: string) {
        const response = await larpClient.RemoveProfileEmail({ session: {sessionId: this._sessionId}, value: exisingEmail });
        this.parseProfile(response.profile);
        this.notifySubscribers();
    }

    async logout(): Promise<boolean> {
        // TODO -- Send logout rpc
        this.updateState(undefined);
        return true;
    }

    async login(email: string): Promise<LoginStatus> {
        this._email = email;
        const result = await larpClient.InitiateLogin({ email: email });
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
                this.parseProfile(result.profile);
                this.updateState(result.session?.sessionId);
                return ConfirmStatus.Success;
            case ValidationResponseCode.EXPIRED:
                return ConfirmStatus.Expired;
            default:
                return ConfirmStatus.Invalid
        }
    }

    static get instance(): SessionService { return sessionService }
 }

const sessionService: SessionService = new SessionService();

export default sessionService;
