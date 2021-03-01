import Constants from "../api/Constants";
import { Wallet } from "../structs/Wallet";
import { BaseClient } from "./BaseClient";

export class Client extends BaseClient {
    constructor(community = Constants.API.defaultCommunity) {
        super(community)
    }

    /** FETCHWALLET
     * 
     * Returns the wallet of the client user
     */
    async fetchWallet(): Promise<Wallet> {
        const res = await this.elevator.request
            .setEndpoint("wallet")
            .resetCommunity()
            .send("json")
        return new Wallet(res.wallet)
    }

    /** FETCHBLOCKED
     * 
     * Returns a list of all blocked useres and users blocking you.
     */
    async fetchBlocked(): Promise<{ blockedUidList: string[], blockerUidList: string[] }> {
        const res = await this.elevator.request
            .setEndpoint("block/full-list")
            .resetCommunity()
            .send("json")
        return { // clean out API messages
            blockedUidList: res.blockedUidList,
            blockerUidList: res.blockerUidList
        }
    }

}