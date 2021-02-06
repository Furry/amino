
import fetch from "node-fetch"

import { API } from "./API"
import { objectToQuerystring } from "../utils/formatting"
import Constants from "./Constants"
import { ApiError, ApiErrors, parseAPIErrorCode } from "../errors/ApiError"

export type HttpRequestMethod = "GET" | "PUT" | "POST" | "DELETE"
export type ExpectResult = "json" | "string"
export type GenericObject = {[key: string] : any}

export class RequestBuilder {

    // Default to a global community scope
    community = Constants.API.defaultCommunity
    body = ""
    query = {}

    method: HttpRequestMethod = "GET"
    endpoint: string = ""

    constructor(private api: API) {
        this.community = api.community
    }

    private constructPath(): string {
        return [
            Constants.API.url,
            Constants.API.version,
            this.community,
            Constants.API.suffix,
            this.endpoint
        ].join("/") + objectToQuerystring(this.query)
    }

    private constructConfig(): GenericObject {
        const obj =  {
            headers: {
                ...this.api.headers
            },
            method: this.method
        }
        if (this.body.length > 2) {
            (obj as any)["body"] = this.body
        }
        return obj
    }

    public setCommunity(community: string): RequestBuilder {
        this.community = community
        return this
    }

    public resetCommunity(): RequestBuilder {
        this.community = Constants.API.defaultCommunity
        return this
    }

    public setEndpoint(endpoint: string): RequestBuilder {
        this.endpoint = endpoint
        return this
    }

    public setBody(input: GenericObject): RequestBuilder {
        this.body = JSON.stringify(input)
        return this
    }

    public setQuery(input: GenericObject): RequestBuilder {
        this.query = input
        return this
    }

    public setMethod(method: HttpRequestMethod): RequestBuilder {
        this.method = method
        return this
    }

    public debug(): RequestBuilder {
        console.log(`Debug for: ${this.constructPath()}`)
        console.log("== CONFIG == ")
        console.log(this.constructConfig())
        console.log("== QUERY ==")
        console.log(this.query)
        return this
    }
    // Note: Patch returned res.text() casted to string for compatability
    public async send<T extends ExpectResult>(expect?: T): Promise<T extends "json" ? GenericObject : string> {
        if (this.endpoint == "") {
            throw "endpoint must be specified with .setEntpoint"
        }

        try {
            let res = await fetch(this.constructPath(), this.constructConfig())
            if (expect == "json") {
                const jsonResponse = await res.json()
                if (jsonResponse["api:statuscode"] != 0) {
                    console.log(jsonResponse)
                    throw jsonResponse["api:statuscode"]
                }
                return jsonResponse
            } else {
                // ! DANGER, BYPASSES ERROR STATUS CHECKING
                return await res.text() as any
            }
        } catch (err) {
            if (!isNaN(err)) {
                throw new ApiError(parseAPIErrorCode(err))
            }
            console.log(err)
            throw new ApiError(ApiErrors.UNKNOWN);
        }
    }

}