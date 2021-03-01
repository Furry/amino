import { API, SocketOverrides } from "../api/API";
import { GenericObject } from "../api/RequestBuilder";
import { SocketManager } from "../managers/SocketManager";
import { Account } from "../structs/Account";
import { Community } from "../structs/Community";
import { Message } from "../structs/Message";
import { Profile } from "../structs/Profile";
import { Thread } from "../structs/Thread";
import { generateId } from "../utils/generation";

export interface BaseClientEvents {
    "message": (message: Message) => void;
    "raw": (data: any) => void;
}

export interface BaseClient {
    on<U extends keyof BaseClientEvents>(
        event: U, listener: BaseClientEvents[U]
    ): this;

    emit<U extends keyof BaseClientEvents>(
        event: U, ...args: Parameters<BaseClientEvents[U]>
    ): boolean;
}

export class BaseClient extends SocketManager {
    protected api: API
    protected _account: Account | undefined
    users: Map<string, Profile>
    threads: Map<string, Thread>
    constructor(community: string, overrides: SocketOverrides) {
        const api = new API(community, overrides);
        super(api);
        this.api = api;

        this.users = new Map()
        this.threads = new Map()
    }

    /** 
     * Elevates the protected API class to instanceof BaseClient 
     */
    get elevator(): API {
        return this.api
    }

    /**
     * Returns the self account
     */
    get account(): Account {
        return this._account as unknown as Account
    }

    /** LOGIN
     * 
     * Logs into the client session
     * @param email string The email of the user account
     * @param password string The password of the user account
     */
    async login(email: string, password: string) {
        const account = new Account(this, await this.api.login(email, password))
        this._account = account
    }

    /** FetchUser
     * 
     * Fetches a user's profile from a given ID
     * @param id string The User's ID
     */
    async fetchUser(id: string): Promise<Profile> {
        const res = await this.api.request
            .setEndpoint(`user-profile/${id}`)
            .send("json")
        const profile = new Profile(this, (res as any)["userProfile"])
        this.users.set(id, profile)
        return profile
    }

    /** FETCHTHREAD
     * 
     * Fetches a given thread from it's ID
     * @param id string The Thread's ID
     */
    async fetchThread(id: string): Promise<Thread> {
        const res = await this.api.request
            .setEndpoint(`chat/thread/${id}`)
            .send("json")
        const thread = new Thread(this, (res as any)["thread"])
        this.threads.set(id, thread)
        return thread
    }

    /** SEARCHTHREADS
     * 
     * Searches for all threads matching a given search query.
     * @param query string The search element
     * @param start number Beginning Paging Index
     * @param stop number Ending Paging Index
     */
    async searchThreads(query: string, start = 0, stop = 25): Promise<Thread[]> {
        const res = await this.elevator.request
            .setQuery({
                type: "public-keyword",
                searchId: generateId(),
                q: query,
                start: start,
                stop: stop
            })
            .setEndpoint("chat/thread")
            .send("json")
        return (res.threadList as GenericObject[]).map((threadJson) => new Thread(this, threadJson))
    }

    /** SEARCHCOMMUNITIES
     * 
     * Searches for communities matching a given string
     * @param query string The search element
     * @param start number Beginning Paging Index
     * @param stop number Ending Paging Index
     */
    async searchCommunities(query: string, start = 0, stop = 25): Promise<Community[]> {
        const res = await this.elevator.request
            .setQuery({
                q: query,
                searchId: generateId(),
                language: "en",
                completeKeyword: 1,
                start: start,
                stop: stop
            })
            .setEndpoint("community/search")
            .resetCommunity()
            .send("json")

        // This endpoint returns both the communities the user account is in and the one it is not.
        // This just aggragates the two different lists together into one.

        const collection = (res.communityList as GenericObject[]).map((communityJson) => new Community(this, communityJson))
        return collection.concat((res.userJoinedCommunityList as GenericObject[]).map((communityJson) => new Community(this, communityJson)))
    }

    async listen() {
        this.startSocket()
        this.on("raw", async (data) => {
            const json = JSON.parse(data)
            const payload = json.o
            switch (json.t) {
                case 1000: {
                    if (!this.users.has(payload.chatMessage.author.uid)) await this.fetchUser(payload.chatMessage.author.uid)
                    if (!this.threads.has(payload.chatMessage.threadId)) await this.fetchThread(payload.chatMessage.threadId)
                    if (!payload.chatMessage.author) {
                        console.log(payload)
                    }
                    payload.chatMessage.author = this.users.get(payload.chatMessage.author.uid)
                    this.emit("message", new Message(this, payload))
                }
            }
        })
    }
}