import { Account } from "../structs/Account";
import Constants from "./Constants";
import { GenericObject, RequestBuilder } from "./RequestBuilder";

export class API {
    private _headers: GenericObject = {
        "User-Agent": Constants.Device.userAgent
    }

    public uid = ""
 
    public loggedIn = false
    public community: string;

    constructor(community: string) {
        if (!community.startsWith("x") && community != "g") {
            this.community = "x" + community
        } else {
            this.community = community
        }
    }

    get headers() {
        return this._headers
    }

    get socketHeaders() {
        return {
            ...this.headers,
            "AUID": this.uid,
            "NDC-MSG-SIG": Constants.Device.msgSignature,
            "NDCDEVICEID": Constants.Device.deviceID
        }
    }

    get request(): RequestBuilder {
        return new RequestBuilder(this);
    }

    // Simplified for development
    public async login(email: string, password: string): Promise<GenericObject> {
        const response = await this.request
        .setMethod("POST")
        .setEndpoint("auth/login")
        .setBody({
            email: email,
            secret: `0 ${password}`,
            deviceID: Constants.Device.deviceID
        }).send("json")

        this.loggedIn = true

        this.uid = response.userProfile.uid
        this._headers = {
            ...this.headers,
            NDCAUTH: `sid=${response.sid}`
        }

        return response
    }
}