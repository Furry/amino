import { GenericError } from "./LibError"

export const ApiErrors = {
    UNKNOWN: {
        "name": "Unknown Error",
        "message": "An unknown error has occured. Please report this on github."
    },

    INVALIDREQUEST: {
        "name": "Invalid Request",
        "message": "Please verify you're accessing the right resource, or sending the correct content."
    },

    FAILEDREQUEST: {
        "name": "Request Failed",
        "message": "The attempted request has failed with status code "
    },

    BADACCOUNT: {
        "name": "Bad Account",
        "message": "The username or password provided is incorrect."
    },

    EMAILVERIFICATION: {
        "name": "Email Verification",
        "message": "Email verification is required. A verification email has been sent to your email address."
    },

    DATAMOVED: {
        "name": "Data Moved",
        "message": "The data you're trying to access no longer exists. Please refresh your query."
    }

}

export function parseAPIErrorCode(code: number | GenericError): GenericError {
    if (isNaN(code as any)) {
        return code as GenericError
    }
    switch (code) {
        case 1: return ApiErrors.INVALIDREQUEST;
        case 200: return ApiErrors.BADACCOUNT;
        case 272: return ApiErrors.EMAILVERIFICATION;
        case 104: return ApiErrors.INVALIDREQUEST;
        case 1600: return ApiErrors.DATAMOVED;
        default: return ApiErrors.UNKNOWN;
    }
}


export class ApiError extends Error { 
    constructor(ErrorObj: GenericError, status?: number) {
        super(!status ? ErrorObj["message"] : ErrorObj["message"] + status)
        this.name = ErrorObj["name"]
    }
}