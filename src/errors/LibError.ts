export interface GenericError {
    name: string,
    message: string
}

export const LibErrors = {
    UNKNOWN: {
        "name": "Unknown Error",
        "message": "An unknown error has occured. Please report this on github."
    },

    NOTLOGGEDIN: {
        "name": "Not Logged In",
        "message": "You must be logged in to use this method."
    },

    COUDLNOTJOIN: {
        "name": "Could Not Join",
        "message": "Could not join the given thread or community. Is it full or private?"
    },

    NOPERMISSIONS: {
        "name": "No Permission",
        "message": "This account doesn't have permission to perform this action."
    },
    
    TOOMANYRECONNECTS: {
        "name": "Too Many Reconnects",
        "message": "The websocket made too many failed reconnect attempts."
    }

}

export function parseLibErrorCode(code: number | GenericError): GenericError {
    if (isNaN(code as any)) {
        return code as LibError
    }

    switch (code) {
        case 1: return LibErrors.NOTLOGGEDIN
        case 2: return LibErrors.NOPERMISSIONS
        case 3: return LibErrors.COUDLNOTJOIN
        default: return LibErrors.UNKNOWN
    }
}

export class LibError extends Error { 
    constructor(ErrorObj: GenericError) {
        super(ErrorObj["message"])
        this.name = ErrorObj["name"]
    }
}