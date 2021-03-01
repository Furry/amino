import Constants from "./Constants";
import { GenericObject, RequestBuilder } from "./RequestBuilder";

export interface SocketOverrides {
    msgSignature?: string,
    deviceID?: string,
    useragent?: string
}

export class API {
    public uid = ""
 
    public loggedIn = false
    public community: string;

    private overrides: SocketOverrides;
    private _headers: GenericObject

    constructor(community: string, overrides: SocketOverrides) {
        this.overrides = overrides
        this._headers = {
            "User-Agent": overrides.useragent ? overrides.useragent : Constants.Device.userAgent
        }
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
            "NDC-MSG-SIG": this.overrides.msgSignature ? this.overrides.msgSignature : Constants.Device.msgSignature,
            "NDCDEVICEID": this.overrides.deviceID ? this.overrides.deviceID : Constants.Device.deviceID
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